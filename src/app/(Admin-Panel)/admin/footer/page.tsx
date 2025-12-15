import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import FormFooter from "@/components/template/p-admin/footer/FormFooter";
import React from "react";

function page() {
  return (
    <>
      <TopBar title="فوتر" />

      <div className="mt-5">
        <FormFooter />
      </div>
    </>
  );
}

export default page;
