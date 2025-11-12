import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Table from "@/components/template/p-admin/comment/Table";
import commentModel from "@/models/comment";

async function page() {
  const comments = await commentModel.find({}).lean();
  return (
    <div>
      <TopBar title="کامنت ها" />

      <div>
        <Table comments={JSON.parse(JSON.stringify(comments))} />
      </div>
    </div>
  );
}

export default page;
