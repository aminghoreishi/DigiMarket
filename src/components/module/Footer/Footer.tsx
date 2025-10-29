import Image from "next/image";
import React from "react";
import FeatureFooter from "./FeatureFooter";

function Footer() {
  return (
    <div className="border-t-2 border-zinc-400">
      <div className="container mx-auto mt-5">
        <div className="flex items-center gap-28 justify-between">
          <div>
            <Image
              src="/image/logo (1).png"
              width={200}
              height={200}
              alt="logo"
            />
          </div>
          <div className="">
            <p className="text-xs font-danaMed w-[900px] text-zinc-400">
              دیجی استار فروشگاه آنلاین معتبری است که انواع کالاهای دیجیتال
              مانند گوشی، لپ‌تاپ، تبلت و لوازم جانبی را با ضمانت اصالت و ارسال
              سریع ارائه می‌دهد. با تنوع گسترده محصولات، قیمت‌های رقابتی و
              پشتیبانی حرفه‌ای، خریدی آسان و مطمئن را تجربه کنید. بررسی تخصصی،
              مقایسه و انتخاب آگاهانه از مزایای خرید از دیجی استار است. برای
              دسترسی به جدیدترین محصولات دیجیتال، همین حالا به دیجی استار سر
              بزنید!
            </p>
          </div>
          <div className="text-zinc-400">
            <button className="text-sm font-danaMed text-nowrap">
              برو بالا
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3  items-center mt-5">
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
        </div>

        <div className="grid grid-cols- mt-5">
            <div className="flex items-baseline text-sm  gap-5 font-danaMed">
                <div>
                    <h2>دسترسی سریع</h2>
                    <ul className="mt-3 flex flex-col gap-3 text-xs text-zinc-400 *:cursor-pointer">
                        <li>وبلاگ</li>
                        <li>درباره ما</li>
                        <li>تماس باما</li>
                    </ul>
                </div>
                <div>
                    <h2>محبوب ترین برند ها</h2>
                    <ul className="mt-3 flex flex-col gap-3 text-xs text-zinc-400 *:cursor-pointer">
                        <li>شیامومی</li>
                        <li>سامسونگ</li>
                        <li>ایفون</li>
                        <li>ال جی</li>
                    </ul>
                </div>

                <div>
                    <h2>ارتباط مستقیم</h2>
                </div>
            </div>
            <div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
