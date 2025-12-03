import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import FormCat from "@/components/template/p-admin/category/createCategory/FormCat";

function page() {
  return (
    <>
      <TopBar title="ایجاد دسته بندی" />
      <div className="mt-8">
        <FormCat />
      </div>
    </>
  );
}

export default page;
