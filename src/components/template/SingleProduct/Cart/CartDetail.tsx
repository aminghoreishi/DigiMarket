import { SiAdguard } from "react-icons/si";
import { AiOutlineLike } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
function CartDetail({ delivery, price, count }: { delivery: boolean | number; price: number; count: number }) {
  return (
    <>
      <div className="flex items-center text-sm font-danaMed border-b-2 pb-4 gap-2 border-zinc-200">
        <SiAdguard size={20} className="text-green-500 " />
        <p className="ss02">گارانتی 12 ماهه</p>
      </div>
      <div className="flex items-center text-sm font-danaMed border-b-2 pb-4 gap-2 border-zinc-200">
        <BsTruck size={20} className="" />
        <p>
          ارسال <span className="ss02">{delivery}</span> روز کاری
        </p>
      </div>
      <div className="flex items-center text-sm font-danaMed border-b-2 pb-4 gap-2 border-zinc-200">
        <AiOutlineLike size={20} className="text-green-500" />
        <p className="ss02">
          رضایت از محصول: <span>% 97</span>
        </p>
      </div>
      <div>
        <div className="flex items-center font-danaMed justify-end gap-2">
          <p className="text-2xl">{price.toLocaleString("fa-IR")}</p>
          <p>تومان</p>
        </div>
        {
          count === 0 && (
            <div>
              <p className="text-xs font-danaMed text-red-500">این محصول در انبار موجود نیست</p>
            </div>
          )
        }
        { count !== 0 && count < 5 && (
          <div>
            <p className="text-xs font-danaMed text-orange-500">
              تنها <span>{count}</span> عدد در انبار باقی مانده
            </p>
          </div>
        )}
      </div>
    </>
  );
}
export default CartDetail;
