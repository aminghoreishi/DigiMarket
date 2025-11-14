import { getDaysAgo } from "@/utils/cal";
import { get } from "http";
import React from "react";

interface CommentDetailsProps {
  body: string | undefined;
  likesCount: number | undefined;
  dislikesCount: number | undefined;
  createdAt: string | undefined;
  product: {
    title: string | undefined;
  } | undefined;
}

const CommentDetails: React.FC<CommentDetailsProps> = ({
  body,
  likesCount,
  dislikesCount,
  createdAt,
  product,
}) => {
  return (
    <div>
      <textarea
        className="text-xs w-full p-3 border-2 border-gray-200 outline-0 rounded-xl"
        readOnly={true}
        value={body}
      ></textarea>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center gap-5 text-sm">
          <p>تعداد نظرات مثبت کامنت: </p>
          <p>{likesCount}</p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <p>تعداد نظرات منفی کامنت: </p>
          <p>{dislikesCount}</p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <p>تاریخ ایجاد:</p>
          <p>{getDaysAgo(createdAt)}</p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <p>محصول:</p>
          <p className="text-xs">{product?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
