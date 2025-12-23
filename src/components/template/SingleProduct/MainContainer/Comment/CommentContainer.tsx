import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { memo } from "react";
import { auth } from "@/auth";
import userModel from "@/models/user";
import db from "@/config/db";

async function CommentContainer({
  isLoggedIn,
  userID,
  findProductID,
}: {
  isLoggedIn: boolean;
  findProductID: string;
  userID: string;
}) {
  await db();
  const session = await auth();

  const userFindId = await userModel.findOne(
    { email: session?.user?.email },
    "_id"
  );

  return (
    <div className="border-t-2 font-danaMed border-zinc-200 pt-5">
      <h2>دیدگاه ها</h2>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-5">
        <div className="xl:col-span-3">
          <CommentForm
            session={JSON.parse(JSON.stringify(userFindId))}
            userID={userID}
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
