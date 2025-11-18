import MainCart from "@/components/template/cart/MainCart/MainCart";
import TopSec from "@/components/template/cart/TopSec/TopSec";
import db from "@/config/db";
import { authUser } from "@/utils/auth";

async function page() {
  await db();

  const isUserLoggedIn = await authUser();

  console.log("isUserLoggedIn:", isUserLoggedIn.user);

  return (
    <div className="container mx-auto">
      <TopSec />

      <div>
        <MainCart isUserLoggedIn={isUserLoggedIn.user} />
      </div>
    </div>
  );
}

export default page;
