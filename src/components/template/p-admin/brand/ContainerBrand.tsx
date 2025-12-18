"use client";
import { useState } from "react";
import FormBrand from "./FormBrand";
import Table from "./Table";
function ContainerBrand({
  brands,
  totalPages,
}: {
  brands?: any;
  totalPages: number;
}) {
  const [brandState, setBrandState] = useState([...brands]);
  const [totalPageState, setTotalPageState] = useState(totalPages);
  const [intialBrand, setintialBrand] = useState([...brands]);
  return (
    <div>
      <div>
        <FormBrand setBrandState={setBrandState} />
      </div>
      <div className="mt-8">
        <Table
          brands={brandState}
          setBrandState={setBrandState}
          totalPageState={totalPageState}
          intialBrand={intialBrand}
          setTotalPageState={setTotalPageState}
        />
      </div>
    </div>
  );
}

export default ContainerBrand;
