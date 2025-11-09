import TopBar from "@/components/module/p-admin/TopBar/TopBar"
import CategoryTable from "@/components/template/p-admin/category/CategoryTable"

function page() {
  return (
    <div>
        <TopBar title="دسته بندی ها" />

        <div>
            <CategoryTable />
        </div>
    </div>
  )
}

export default page