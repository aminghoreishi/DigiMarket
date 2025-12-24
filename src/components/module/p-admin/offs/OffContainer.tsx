"use client";

import { useState } from "react";
import OffForm from "./OffForm";
import OffTable from "./OffTable";
import type { Off } from "@/types/off";

type SubCategory = {
  _id: string;
  title: string;
};

type OffContainerProps = {
  offs: Off[];
  subCat: SubCategory[];
  totalPages: number;
};

function OffContainer({ offs, subCat, totalPages }: OffContainerProps) {
  const [offsState, setOffs] = useState<Off[]>(offs);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPagesState, setTotalPages] = useState<number>(totalPages);

  const [initialOffs] = useState<Off[]>(offs);

  return (
    <>
      <OffForm
        currentPage={currentPage}
        setOffs={setOffs}
        subCategories={subCat}
      />

      <div className="mt-8">
        <OffTable
          offs={offsState}
          setOffs={setOffs}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPagesState}
          setTotalPages={setTotalPages}
          initialOffs={initialOffs}
        />
      </div>
    </>
  );
}

export default OffContainer;
