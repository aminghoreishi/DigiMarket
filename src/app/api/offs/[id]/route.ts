import db from "@/config/db";
import offsModel from "@/models/offs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db();

  const { id } = params;
  const off = await offsModel.findByIdAndDelete(id);

  if (!off) {
    return NextResponse.json(
      { message: "Off not found" },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    { message: "Off deleted successfully" },
    {
      status: 200,
    }
  );
}
