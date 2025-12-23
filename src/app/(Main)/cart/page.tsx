import { auth } from "@/auth";
import MainCartContainer from "@/components/template/cart/Main/MainCart";
import db from "@/config/db";
import userModel from "@/models/user";
import { authUser } from "@/utils/auth";

async function page() {
  await db();
  const isUserLoggedIn = await authUser();
  const isLoggin = isUserLoggedIn.user ? true : false;
  const authUserSession = await auth();

  const userFind = await userModel.findOne(
    { email: authUserSession?.user?.email },
    "_id"
  );

  return (
    <MainCartContainer
      isUserLoggedIn={isLoggin}
      authUserEmail={userFind.toString()}
      id={isUserLoggedIn?.user?._id}
    />
  );
}

export default page;
