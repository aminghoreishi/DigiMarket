import { CiCircleInfo } from "react-icons/ci";
import FeatureContainer from "../FeatureContainer/FeatureContainer";
import CommentRate from "./CommentRate";
function Info({
  features,
  findProductID,
  title,
  name
}: {
  features: any[];
  findProductID: string;
  title: string;
  name: string;
}) {
  return (
    <div className="mt-5">
      <div>
        <h2 className="font-danaMed text-lg line-clamp-3 ss02">{title}</h2>
      </div>
      <div className="mt-3">
        <p className="text-xs text-zinc-400">
          {name}
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
