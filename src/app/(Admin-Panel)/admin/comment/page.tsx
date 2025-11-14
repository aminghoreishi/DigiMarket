import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Table from "@/components/template/p-admin/comment/Table";
import commentModel from "@/models/comment";

async function page() {
  const comments = await commentModel
    .find({})
    .sort({ createdAt: -1 })
    .populate("product")
    .skip(0)
    .limit(7)
    .lean();

  const totalComments = await commentModel.countDocuments({});
  const totalPages = Math.ceil(totalComments / 7);

  return (
    <div>
      <TopBar title="کامنت ها" />

      <div>
        <Table
          totalPages={totalPages}
          comments={JSON.parse(JSON.stringify(comments))}
          initialPage={1}
        />
      </div>
    </div>
  );
}

export default page;
