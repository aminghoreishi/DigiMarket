import React from "react";
import Acc from "./Acc";
import MyAccordion from "./Acc";
function Search() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <MyAccordion />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">1</div>
    </div>
  );
}

export default Search;
