import React from "react";
import Comments from "./Comments";

function CommentContainer() {
  return (
    <div className="border-t-2 border-zinc-200 pt-5">
      <h2>دیدگاه ها</h2>

      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-3">jjjjjjjjjj</div>
        <div className="col-span-9">
            <Comments/>
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
