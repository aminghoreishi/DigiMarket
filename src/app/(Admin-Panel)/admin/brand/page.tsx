import React from "react";
import FormBrand from "@/components/template/p-admin/brand/FormBrand";
import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import ContainerBrand from "@/components/template/p-admin/brand/ContainerBrand";
function Page() {
  return (
    <div>
            <TopBar title="مدیریت برند ها" />
     

            <ContainerBrand />
    </div>
  );
}

export default Page;
