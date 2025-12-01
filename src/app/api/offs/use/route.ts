import db from "@/config/db";
import offsModel from "@/models/offs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { code, id, userID } = await req.json();

    const offsModels = await offsModel.findOne({ code, product: id });

    console.log(offsModels);

    const isUserUsed = offsModels.user.find(
      (user) => user.toString() === userID
    );

    if (isUserUsed) {
      return NextResponse.json(
        {
          message: "شما قبلا از این کد استفاده کرده اید",
        },
        { status: 400 }
      );
    }

    await offsModel.findOneAndUpdate(
      { code, product: id },
      {
        $inc: { use: 1 },
        $push: { user: userID },
      },
      { new: true }
    );

    if (!offsModels) {
      return NextResponse.json({ message: "کد وجود ندارد" });
    } else if (offsModels.use > offsModels.max) {
      return NextResponse.json({ messgahe: "کد به حداکثر رسیده" });
    } else
      return NextResponse.json({
        success: true,
        discount: offsModels.discount, // ← این خط حیاتیه!
        message: "کد تخفیف با موفقیت اعمال شد",
      });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "خطا در استفاده از کد تخفیف" },
      {
        status: 500,
      }
    );
  }
}
