"use client";
import React, { memo, useEffect, useState } from "react";
import Comment from "./Comment";
import Pagination from "@/components/module/Pagination/Pagination";

const Comments: React.FC<{ findProductID: string }> = memo(
  ({ findProductID }) => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
      getComment();
    }, [currentPage]);

    const getComment = async () => {
      const res = await fetch(
        `http://localhost:3000/api/comment/${findProductID}?page=${currentPage}`
      );

      const response = await res.json();
      console.log(response.totalPages);
      setComments(response.data);
      setTotalPages(response.totalPages);
    };

    return (
      <div className="flex flex-col divide-y-2 divide-zinc-400 space-y-5">
        {comments.length === 0 && <p>هیچ دیدگاهی برای این محصول وجود ندارد.</p>}
        {comments.map((comment: any) => (
          <Comment key={comment._id} comment={comment} />
        ))}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    );
  }
);

Comments.displayName = "Comments";

export default Comments;
