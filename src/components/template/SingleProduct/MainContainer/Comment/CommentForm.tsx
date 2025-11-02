import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

function CommentForm() {
  return (
    <div>
      <h2 className="font-danaMed text-sm">شما هم دیدگاه خود را ثبت کنید</h2>

      <form className="mt-3">
        <div className="flex font-danaMed items-center justify-between">
          <div className="rounded-xl border-2 cursor-pointer border-zinc-200 text-sm px-7 py-2 flex items-center gap-2">
            <AiOutlineLike size={19} className=" text-green-500" />
            <span>پیشنهاد میکنم</span>
          </div>
          <div className="rounded-xl border-2 cursor-pointer border-zinc-200 text-sm px-7 py-2 flex items-center gap-2">
            <AiOutlineDislike size={19} className=" text-red-500" />
            <span>پیشنهاد میکنم</span>
          </div>
        </div>
        <div className="mt-3">
          <textarea className="w-full outline-0 border-2 p-2 rounded-xl border-zinc-200 text-sm h-36"></textarea>
        </div>
        <div className="mt-3">
          <button className="bg-orange-500 text-white text-sm p-2 rounded-xl font-danaMed w-full">
            ارسال دیدگاه
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
