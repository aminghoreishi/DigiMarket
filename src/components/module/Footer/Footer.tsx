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

        <div className="flex justify-between items-center mt-5">
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
        </div>
      </div>
    </div>
  );
}

export default Footer;
