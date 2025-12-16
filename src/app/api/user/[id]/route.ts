import db from "@/config/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  try {
    await db();

    const { id } = params;

    await userModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "User deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      {
        status: 500,
      }
    );
  }
}
