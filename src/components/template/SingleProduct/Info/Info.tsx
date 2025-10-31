import { AiOutlineMessage } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";

import { CiCircleInfo } from "react-icons/ci";
import FeatureContainer from "../FeatureContainer/FeatureContainer";
function Info() {
  return (
    <div className="mt-5">
      <div>
        <h2 className="font-danaMed text-lg">
          لپ تاپ 13.3 اینچی ایسوس مدل Zenbook S 13 OLED UX5304VA
        </h2>
      </div>
      <div className="mt-3">
        <p className="text-sm text-zinc-400">
          Asus Zenbook S 13 OLED UX5304VA-NQ003 13.3 Inch Laptop
        </p>
      </div>
      <div className="flex items-center mt-3 gap-3">
        <div className="flex items-center font-danaMed text-orange-400 text-sm gap-2">
          <AiOutlineMessage />
          <p>
            <span>2</span> دیدگاه
          </p>
        </div>
        <div className="text-sm flex items-center gap-2" dir="rtl">
          <p>(72) 4.4</p>
          <FaStar />
        </div>
      </div>
      <div className="mt-3 border-b-2 border-zinc-200 pb-5">
        <FeatureContainer />
      </div>
      
      <div className="flex items-center gap-3 mt-5 text-zinc-500">
        <div>
          <CiCircleInfo size={20} />
        </div>
        <div className=" max-sm:text-xs text-sm font-danaMed">
          <p className="">
            درخواست مرجوع کردن کالا در گروه لپ تاپ با دلیل "انصراف از خرید" تنها
            در صورتی قابل تایید است که کالا در شرایط اولیه باشد (در صورت پلمپ
            بودن، کالا نباید باز شده باشد).
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
