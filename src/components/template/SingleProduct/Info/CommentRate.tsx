import { AiOutlineMessage } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
function CommentRate({
  findProductID,
  rateCount,
  rateCalculate,
}: {
  findProductID: string;
  rateCount: string;
  rateCalculate: number;
}) {
  return (
    <div className="flex items-center mt-3 gap-3">
      <div className="flex items-center font-danaMed text-orange-400 text-sm gap-2">
        <AiOutlineMessage />
        <p className="font-danaMed ss02">
          <span>{rateCount}</span> دیدگاه
        </p>
      </div>
      <div className="text-sm flex items-center gap-2" dir="rtl">
        <p className=" font-danaMed ss02">
          {Number.isFinite(rateCalculate) ? rateCalculate : 0}
        </p>
        <FaStar />
      </div>
    </div>
  );
}

export default CommentRate;
