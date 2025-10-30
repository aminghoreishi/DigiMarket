import Image from "next/image";
import FeatureFooter from "./FeatureFooter";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTelegram } from "react-icons/bs";
function Footer() {
  return (
    <div className="border-t-2 border-zinc-400">
      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-center">
          <div className="max-sm:flex max-sm:justify-center">
            <Image
              src="/image/logo (1).png"
              width={200}
              height={200}
              alt="logo"
            />
          </div>
          <div className="col-span-2">
            <p className="text-xs font-danaMed  text-zinc-400">
              دیجی استار فروشگاه آنلاین معتبری است که انواع کالاهای دیجیتال
              مانند گوشی، لپ‌تاپ، تبلت و لوازم جانبی را با ضمانت اصالت و ارسال
              سریع ارائه می‌دهد. با تنوع گسترده محصولات، قیمت‌های رقابتی و
              پشتیبانی حرفه‌ای، خریدی آسان و مطمئن را تجربه کنید. بررسی تخصصی،
              مقایسه و انتخاب آگاهانه از مزایای خرید از دیجی استار است. برای
              دسترسی به جدیدترین محصولات دیجیتال، همین حالا به دیجی استار سر
              بزنید!
            </p>
          </div>
          <div className="text-zinc-400 max-sm:row-end-3 flex justify-center">
            <button className="text-sm font-danaMed text-nowrap">
              برو بالا
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3  items-center mt-5">
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
          <FeatureFooter />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-5">
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
          <div className="flex items-center ">
            <div className="flex items-center">
              <div className="">
                <Image
                  width={100}
                  height={100}
                  alt="zarinPal"
                  src="/image/zarinPal.png"
                />
              </div>
              <div className="">
                <Image
                  width={100}
                  height={100}
                  alt="zarinPal"
                  src="/image/symbol-02.png"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-danaMed text-sm">شبکه های اجتماعی</h2>
            <div className="flex items-center gap-3">
              <div>
                <IoLogoInstagram size={30} className="text-pink-500 mt-2" />
              </div>
              <div>
                <BsTelegram size={30} className="text-blue-500 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
