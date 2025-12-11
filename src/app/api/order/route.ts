import db from "@/config/db";
import orderModel from "@/models/order";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const {
      user,
      phone,
      address1,
      fullName,
      address2,
      deliveryMethod,
      products,
      totalPrice,
      status,
    } = body;

    for (const item of products) {
      const productId = item.product;
      const requestedCount = item.count || 1;

      const updatedProduct = await productModel.findOneAndUpdate(
        {
          _id: productId,
          count: { $gte: requestedCount },
        },
        {
          $inc: { count: -requestedCount, salesCount: requestedCount },
        },
        { new: true }
      );

      if (!updatedProduct) {
        const found = await productModel.findById(productId);
        if (!found) {
          throw new Error(`محصول با آیدی ${productId} یافت نشد`);
        }

        throw new Error(
          `موجودی محصول "${found.title || found.name}" کافی نیست (درخواست: ${requestedCount}، موجود: ${found.count})`
        );
      }
    }

    const newOrder = await orderModel.create({
      user: user.toString(),
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
      {
        message: "سفارش با موفقیت ثبت شد و موجودی محصولات بروز شد",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        message: error.message || "خطا در ثبت سفارش",
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  await db();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "user" },
        { path: "products.product", select: "title price name" },
      ])
      .skip(skip)
      .limit(limit)
      .lean();

    const totalOrders = await orderModel.countDocuments({});
    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json(
      {
        data: orders,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        message: error.message || "خطا در دریافت سفارشات",
      },
      { status: 400 }
    );
  }
}
