import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import { authUser } from "@/utils/auth";

async function page() {
  const user = await authUser();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";
  const displayName = user?.fullName || user?.email?.split("@")[0] || "کاربر";

  // console.log("User in Buttons:", user);
  // console.log("isAdmin in Buttons:", isAdmin);
  // console.log("isLoggedIn in Buttons:", isLoggedIn);
  // console.log("displayName in Buttons:", displayName);
  return (
    <div>
      <TopBar title="صحفه اصلی" />
    </div>
  );
}

export default page;
