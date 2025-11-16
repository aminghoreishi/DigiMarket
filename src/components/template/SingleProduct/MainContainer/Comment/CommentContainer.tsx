import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { memo } from "react";

function CommentContainer({
  isLoggedIn,
  userID,
  findProductID,
}: {
  isLoggedIn: boolean;
  findProductID: string;
  userID: string;
}) {
  console.log("findProduct", findProductID);

  return (
    <div className="border-t-2 font-danaMed border-zinc-200 pt-5">
      <h2>دیدگاه ها</h2>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-5">
        <div className="xl:col-span-3">
          <CommentForm
            userID={userID}
            isLoggedIn={isLoggedIn}
            findProductID={findProductID}
          />
        </div>
        <CommentCon findProductID={findProductID} />
      </div>
    </div>
  );
}

const CommentCon = memo(({ findProductID }: { findProductID: string }) => {
  return (
    <div className="xl:col-span-9">
      <Comments findProductID={findProductID.toString()} />
    </div>
  );
});

export default CommentContainer;
