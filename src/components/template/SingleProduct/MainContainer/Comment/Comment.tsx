import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
function Comment({ comment }: { comment: any }) {
  console.log(comment);

  return (
    <div className="font-danaMed pb-5">
      <h2 className="text-lg">{comment.user.fullName}</h2>
      <div className="flex text-sm max-sm:text-xs items-center gap-2 my-3 border-b-2 border-b-zinc-200 pb-2">
        <p>{comment.createdAt.slice(0,10)}</p>
        <p className="bg-green-500 text-white px-2 rounded-xl py-1 ">خریدار</p>
      </div>
      <div className="mt-2">
        {comment.isOk ? (
          <div className="flex items-center gap-2 mb-2 text-green-500">
            <AiOutlineLike size={19} />
            <p>پیشنهاد میشود</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2 text-red-500">
            <AiOutlineDislike size={19} />
            <p>پیشنهاد نمی شود</p>
          </div>
        )}

        <p className="text-sm">{comment.body}</p>
      </div>
      <div className="">
        <div className="flex justify-end gap-5 items-center">
          <p className="text-sm text-zinc-500">
            ایا این دیدگاه برایتان مفید بود؟
          </p>
          <div className="border-2 border-zinc-200 rounded-xl p-2 cursor-pointer">
            <AiOutlineLike size={19} color="green" />
          </div>
          <div className="border-2 border-zinc-200 rounded-xl p-2 cursor-pointer">
            <AiOutlineDislike size={19} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
