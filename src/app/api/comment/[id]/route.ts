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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const page = JSON.parse(searchParams.get("page"));

    const skip = (Number(page) - 1) * 4;

    const comments = await commentModel
      .find({ product: { _id: id }, isApproved: true })
      .skip(skip)
      .limit(4)
      .populate("user")
      .lean();

    const total = await commentModel.countDocuments({
      isApproved: true,
      product: { _id: id },
    });

    const totalPages = Math.ceil(total / 4);

    if (!page) {
      return NextResponse.json({ data: comments, totalPages }, { status: 200 });
    }

    return NextResponse.json({ data: comments, totalPages }, { status: 200 });
  } catch (error) {}
}

export async function DELETE(
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
    const deletedComment = await commentModel.findByIdAndDelete(id);

    if (!deletedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
