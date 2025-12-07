import MainCartContainer from "@/components/template/cart/Main/MainCart";
import db from "@/config/db";
import { authUser } from "@/utils/auth";

async function page() {
  await db();
  const isUserLoggedIn = await authUser();
  const isLoggin = isUserLoggedIn.user ? true : false
  return <MainCartContainer isUserLoggedIn={isLoggin} id={isUserLoggedIn?.user?._id} />;
}

export default page;
