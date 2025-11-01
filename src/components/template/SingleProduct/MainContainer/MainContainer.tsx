import React from "react";
import Navbar from "./Navbar";
import Description from "./Description";
import Specifications from "./Specifications";

function MainContainer() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-5">
        <Description />
      </div>
      <div className="mt-5">
        <Specifications />
      </div>
    </div>
  );
}

export default MainContainer;
