import React from "react";
import Comment from "./Comment";

function Comments() {
  return (
    <div className="flex flex-col divide-y-2 divide-zinc-400 space-y-5">
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default Comments;
