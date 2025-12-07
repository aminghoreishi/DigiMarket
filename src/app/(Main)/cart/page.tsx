import MainCartContainer from "@/components/template/cart/Main/MainCart";
import db from "@/config/db";
import { authUser } from "@/utils/auth";

async function page() {
  await db();
  const isUserLoggedIn = await authUser();
  return <MainCartContainer isUserLoggedIn={isUserLoggedIn?.user?._id} id={isUserLoggedIn?.user?._id} />;
}

export default page;
