import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import FormFooter from "@/components/template/p-admin/footer/FormFooter";
import db from "@/config/db";
import footerModel from "@/models/footer";
import React from "react";

async function page() {
  await db();

  const footer = await footerModel.find({});
  return (
    <>
      <TopBar title="فوتر" isPanelUser={false} />

      <div className="mt-5">
        <FormFooter footer={JSON.parse(JSON.stringify(footer))} />
      </div>
    </>
  );
}

export default page;
