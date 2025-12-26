import { auth } from "@/auth";
import MainCartContainer from "@/components/template/cart/Main/MainCart";
import db from "@/config/db";
import userModel from "@/models/user";
import { authUser } from "@/utils/auth";

async function page() {
  await db();

  const authResult = await authUser();
  const session = await auth();

  const user = session?.user?.email
    ? await userModel.findOne(
        { email: session.user.email },
        "_id fullName email"
      )
    : null;

  return (
    <MainCartContainer
      isUserLoggedIn={
        user
          ? {
              id: user._id.toString(),
              fullName: user.fullName,
              email: user.email,
            }
          : null
      }
      authUserId={user?._id.toString() ?? ""}
      id={user?._id.toString() ?? ""}
    />
  );
}

export default page;
