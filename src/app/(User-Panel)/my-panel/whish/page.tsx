import React from "react";
import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import WhishProductContainer from "@/components/template/user-panel/whish/product/WhishProductContainer";
function page() {
  return (
    <div className="font-danaMed">
      <div>
        <TopBar title="علاقه مندی ها" isPanelUser={true} />
      </div>

      <div>
      <WhishProductContainer/>
      </div>
    </div>
  );
}

export default page;
