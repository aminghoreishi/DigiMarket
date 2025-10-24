import { NextRequest, NextResponse } from "next/server";
import subLinkModel from "@/models/subLink";
import db from "@/config/db";
import linkModel from "@/models/link";
import checkSubLink from "@/validator/subLink";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();

    const { title, href, parentLinkId } = body;

    const validationResult = checkSubLink(body);

    if (validationResult !== true) {
      return Response.json(
        {
          error: "Validation failed",
          details: validationResult,
        },
        { status: 400 }
      );
    }

    const sub = await subLinkModel.create({ title, href, parentLinkId });

    await linkModel.findOneAndUpdate(
      { _id: parentLinkId },
      {
        $push: {
          subLink: sub._id,
        },
      }
    );

    return NextResponse.json({ message: "Created successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message });
  }
}
