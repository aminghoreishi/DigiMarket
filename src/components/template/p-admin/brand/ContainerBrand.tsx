"use client";
import { useState } from "react";
import FormBrand from "./FormBrand";
import Table from "./Table";
function ContainerBrand({ brands }: { brands?: any }) {
  const [brandState, setBrandState] = useState([...brands]);
  return (
    <div>
      <div>
        <FormBrand setBrandState={setBrandState} />
      </div>
      <div className="mt-8">
        <Table brands={brandState} setBrandState={setBrandState} />
      </div>
    </div>
  );
}

export default ContainerBrand;
