"use client";
import { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
function CommentRate({ findProductID }: { findProductID: string }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const res = await fetch(`/api/comments/${findProductID}`);
    const data = await res.json();
  };

  return (
    <div className="flex items-center mt-3 gap-3">
      <div className="flex items-center font-danaMed text-orange-400 text-sm gap-2">
        <AiOutlineMessage />
        <p className="font-danaMed ss02">
          <span>2</span> دیدگاه
        </p>
      </div>
      <div className="text-sm flex items-center gap-2" dir="rtl">
        <p className=" font-danaMed ss02">(72) 4.4</p>
        <FaStar />
      </div>
    </div>
  );
}

export default CommentRate;
