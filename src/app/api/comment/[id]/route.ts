import db from "@/config/db";
import commentModel from "@/models/comment";
import { authAdmin } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await authAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await db();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const comment = await commentModel.findById(id);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const newValue = !comment.isApproved;

    const updated = await commentModel.findByIdAndUpdate(
      id,
      { $set: { isApproved: newValue } },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Comment approval toggled",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Toggle comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
