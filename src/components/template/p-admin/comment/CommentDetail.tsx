import React from "react";

const CommentDetails: React.FC = ({
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
          <p>{createdAt}</p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <p>محصول:</p>
          <p className="text-xs">{product}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
