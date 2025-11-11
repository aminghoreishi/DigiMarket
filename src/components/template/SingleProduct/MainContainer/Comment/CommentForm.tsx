"use client";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import Swal from "sweetalert2";
function CommentForm({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [comment, setComment] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean | null>(null);

  const createComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Swal.fire({
        title: "برای ثبت دیدگاه باید وارد شوید",
        icon: "warning",
        timer: 2000,
      });
      return;
    }

    if (comment.trim() === "") {
      Swal.fire({
        title: "لطفاً دیدگاه خود را وارد کنید",
        icon: "warning",
        timer: 2000,
      });
      return;
    }

    if (isLike === null) {
      Swal.fire({
        title: "لطفاً نظر خود را درباره پیشنهاد یا عدم پیشنهاد انتخاب کنید",
        icon: "warning",
        timer: 2000,
      });
      return;
    }
  };

  return (
    <div>
      <h2 className="font-danaMed text-sm">شما هم دیدگاه خود را ثبت کنید</h2>

      <form className="mt-3">
        <div className="flex font-danaMed items-center justify-between">
          <div
            onClick={() => setIsLike(true)}
            className={`${isLike ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"} rounded-xl border-2 cursor-pointer  border-zinc-200 text-sm px-7 py-2 flex items-center gap-2`}
          >
            <AiOutlineLike
              size={19}
              className={` ${isLike ? "text-white" : "text-gray-500"}`}
            />
            <span>پیشنهاد میکنم</span>
          </div>
          <div
            onClick={() => setIsLike(false)}
            className={`${isLike === false ? "bg-red-500 text-white" : "bg-gray-100 text-gray-800"} rounded-xl border-2 cursor-pointer border-zinc-200 text-sm px-7 py-2 flex items-center gap-2`}
          >
            <AiOutlineDislike
              size={19}
              className={` ${isLike === false ? "text-white" : "text-gray-500"}`}
            />
            <span>پیشنهاد میکنم</span>
          </div>
        </div>
        <div className="mt-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full outline-0 border-2 p-2 rounded-xl border-zinc-200 text-sm h-36"
          ></textarea>
        </div>
        <div className="mt-3">
          <button
            onClick={createComment}
            className="bg-orange-500 text-white text-sm p-2 rounded-xl font-danaMed w-full"
          >
            ارسال دیدگاه
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
