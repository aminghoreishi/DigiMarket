import { CiCircleInfo } from "react-icons/ci";
import FeatureContainer from "../FeatureContainer/FeatureContainer";
import CommentRate from "./CommentRate";
function Info({
  features,
  findProductID,
}: {
  features: any[];
  findProductID: string;
}) {
  return (
    <div className="mt-5">
      <div>
        <h2 className="font-danaMed text-lg ss02">
          لپ تاپ 13.3 اینچی ایسوس مدل Zenbook S 13 OLED UX5304VA
        </h2>
      </div>
      <div className="mt-3">
        <p className="text-sm text-zinc-400">
          Asus Zenbook S 13 OLED UX5304VA-NQ003 13.3 Inch Laptop
        </p>
      </div>
      <div>
        <CommentRate findProductID={findProductID.toString()} />
      </div>

      <div className="mt-3 border-b-2 border-zinc-200 pb-5">
        <FeatureContainer features={features} />
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
