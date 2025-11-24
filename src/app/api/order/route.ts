import orderModel from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, phone, address1, fullName, address2, deliveryMethod, products, totalPrice, status } = body;
    

    await orderModel.create({
      user,
      phone,
      address1,
      address2,
      fullName,
      deliveryMethod,
      products,
      totalPrice,
      status: status || "pending",
    });

    return NextResponse.json(
      { message: "Order created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
