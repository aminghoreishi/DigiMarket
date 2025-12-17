"use client";

import { useState } from "react";
import OffForm from "./OffForm";
import OffTable from "./OffTable";

type Off = {
  _id: string;
  code: string;
  max: number;
  discount: number;
  use: number;
  user: string[];
  createdAt: string;
};

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
      <div>
        <OffForm
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setOffs={setOffs}
          subCategories={subCat}
        />
      </div>

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
