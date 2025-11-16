"use client";
import { memo, useState } from "react";
import toast from "react-hot-toast"; // ← only toast
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BeatLoader } from "react-spinners";

const CommentForm = memo(
  ({ findProductID, userID }: { findProductID: string; userID: string }) => {
    const [body, setBody] = useState<string>("");
    const [isOk, setIsOk] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        const response = await fetch("/api/comment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body,
            isOk,
            product: findProductID,
            user: userID,
          }),
        });

        if (response.ok) {
          toast.success("دیدگاه شما با موفقیت ثبت شد", {
            style: { fontFamily: "dana", fontSize: "14px" },
            className: "!font-danaMed",
            duration: 3000,
          });
          setBody("");
          setIsOk(null);
        } else {
          toast.error("خطا در ثبت دیدگاه. لطفا دوباره تلاش کنید.", {
            style: { fontFamily: "dana", fontSize: "14px" },
            className: "!font-danaMed",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error creating comment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div>
        <h2 className="font-danaMed text-sm">شما هم دیدگاه خود را ثبت کنید</h2>

        <form className="mt-3">
          <div className="flex font-danaMed items-center justify-between">
            <div
              onClick={() => setIsOk(true)}
              className={`transition-colors ${
                isOk ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"
              } rounded-xl border-2 cursor-pointer border-zinc-200 text-sm px-7 py-2 flex items-center gap-2`}
            >
              <AiOutlineLike
                size={19}
                className={isOk ? "text-white" : "text-gray-500"}
              />
              <span>پیشنهاد میکنم</span>
            </div>

            <div
              onClick={() => setIsOk(false)}
              className={`transition-colors ${
                isOk === false
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-800"
              } rounded-xl border-2 cursor-pointer border-zinc-200 text-sm px-7 py-2 flex items-center gap-2`}
            >
              <AiOutlineDislike
                size={19}
                className={isOk === false ? "text-white" : "text-gray-500"}
              />
              <span>پیشنهاد نمیکنم</span>
            </div>
          </div>

          <div className="mt-3">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full outline-0 border-2 p-2 rounded-xl border-zinc-200 text-sm h-36"
            />
          </div>

          <div className="mt-3">
            <button
              onClick={createComment}
              className="bg-orange-500 text-white text-sm p-2 rounded-xl font-danaMed w-full"
            >
              {isLoading ? (
                <BeatLoader size={9} color="white" />
              ) : (
                "ارسال دیدگاه"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default CommentForm;
