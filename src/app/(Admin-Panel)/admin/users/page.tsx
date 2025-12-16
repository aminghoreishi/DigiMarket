import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import User from "@/components/template/p-admin/user/User";
import db from "@/config/db";
import userModel from "@/models/user";

async function page() {
  await db();

  const users = await userModel
    .find({})
    .select("phone email role createdAt fullName")
    .skip(0)
    .limit(10)
    .lean();

  const totalProducts = await userModel.countDocuments({});
  const totalPages = Math.ceil(totalProducts / 10);
  return (
    <div>
      <TopBar title="کاربران" />

      <div dir="rtl" className="mt-4">
        <User users={JSON.parse(JSON.stringify(users))} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
