import db from "@/config/db";
import orderModel from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db();

  let body;
  try {
    body = await request.json();
  } catch (jsonError) {
    // This catches invalid JSON (e.g., malformed body from client)
    console.error("Invalid JSON:", jsonError);
    return NextResponse.json(
      { error: "فرمت JSON ارسالی نامعتبر است" },
      { status: 400 }
    );
  }

  try {
    const { status, totalPrice, products, user, phone, address1, address2 } =
      body;
    const orderId = params.id;

    // Optional: Validate orderId format
    if (!orderId || orderId.length < 12) {
      return NextResponse.json(
        { error: "شناسه سفارش نامعتبر است" },
        { status: 400 }
      );
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {
        status,
        totalPrice,
        products,
        user,
        phone,
        address1,
        address2,
      },
      { new: true, runValidators: true } // Important: runValidators ensures schema rules are applied
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "سفارش با موفقیت به‌روزرسانی شد",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating order:", error);

    // Handle Mongoose validation errors nicely
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: "داده‌های ارسالی نامعتبر است", details: errors },
        { status: 400 }
      );
    }

    // For any other error
    return NextResponse.json(
      { error: "خطای سرور در به‌روزرسانی سفارش" },
      { status: 500 }
    );
  }
}
