import db from "@/config/db";
import brandModel from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db();

    const brand = await brandModel.findById(params.id);
    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    await brandModel.findByIdAndDelete(params.id);

    return NextResponse.json(
      { success: true, deletedBrandId: params.id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}


