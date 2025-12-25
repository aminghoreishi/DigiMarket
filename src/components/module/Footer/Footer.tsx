import Image from "next/image";
import FeatureFooter from "./FeatureFooter";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTelegram } from "react-icons/bs";
import BtnTop from "./BtnTop";
import db from "@/config/db";
import footerModel from "@/models/footer";
import { RiTruckLine } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiTicket2Fill } from "react-icons/ri";
import { FaFingerprint } from "react-icons/fa";
import { IoPricetag } from "react-icons/io5";
async function Footer() {
  await db();
  const footer = await footerModel.find({}, "-__v").lean();
  const parsFooter = JSON.parse(JSON.stringify(footer));
  return (
    <div className="border-t-2 border-zinc-200">
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
              {parsFooter[0]?.aboutUs}
            </p>
          </div>
          <div className="text-zinc-400 max-sm:row-end-3 flex justify-center">
            <BtnTop />
          </div>
        </div>

        <div className="grid grid-cols-1 max-md:my-5 lg:grid-cols-5 gap-3  items-center mt-5">
          <FeatureFooter
            icon={RiTruckLine}
            title="ارسال سریع"
            description="ارسال در سریع‌ترین زمان"
          />

          <FeatureFooter
            icon={RiCustomerService2Line}
            title="پشتیبانی"
            description="پشتیبانی ۲۴ ساعته"
          />
          <FeatureFooter
            icon={IoPricetag}
            title="قیمت های مناسب"
            description="قیمت های رقابتی در بازار"
          />
          <FeatureFooter
            icon={FaFingerprint}
            title="خرید سریع و آسان"
            description="خرید سریع و راحت محصولات"
          />
          <FeatureFooter
            icon={RiTicket2Fill}
            title="ضمانت کیفیت"
            description="تضمین کیفیت اجناس"
          />
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
          <div className="flex items-center mt-5 ">
            <div className="flex gap-8 items-center">
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
          <div className="mt-5">
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

        <div className="border-t-2 border-zinc-200 font-danaMed pt-5 pb-5 max-sm:text-xs mt-5 text-sm">
          <div className="flex justify-between">
            <p>
              توسعه <span className="text-orange-500">محمدامین قریشی</span>
            </p>
            <p>
              <span className="text-orange-500">
                {parsFooter[0]?.contactInfo.email}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
