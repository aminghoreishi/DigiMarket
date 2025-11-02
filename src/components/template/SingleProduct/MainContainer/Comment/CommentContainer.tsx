import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

function CommentContainer() {
  return (
    <div className="border-t-2 border-zinc-200 pt-5">
      <h2>دیدگاه ها</h2>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-5">
        <div className="xl:col-span-3">
          <CommentForm/>
        </div>
        <div className="xl:col-span-9">
            <Comments/>
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
