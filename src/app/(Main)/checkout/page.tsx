import TopSec from "@/components/template/cart/TopSec/TopSec";
import Checkout from "@/components/template/checkout/checkout";
import { authUser } from "@/utils/auth";

async function page() {
  const user = await authUser()  
  return (
    <div className="container mx-auto">
      <TopSec />
      <Checkout fullName={user.user?.fullName}  />
    </div>
  );
}

export default page;
