import React from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import MenuMobile from "./MenuMobile";
import Logo from "./Logo";
function Header() {
  return (
    <div className="flex justify-between items-center max-lg:container max-lg:mx-auto max-lg:pt-4 lg:px-4 lg:py-3">
      <div className="lg:hidden">
        <MenuMobile />
      </div>
      <Logo />
      <div className="max-lg:hidden">
        <SearchBar />
      </div>
      <div className="max-lg:hidden">
        <Buttons />
      </div>
    </div>
  );
}

export default Header;
