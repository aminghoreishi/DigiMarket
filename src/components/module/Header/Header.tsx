import React from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import MenuMobile from "./MenuMobile";
import Logo from "./Logo";
function Header() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between px-2 relative bottom-0 right-0 shadow-2xl items-center  py-3">
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
    </div>
  );
}

export default Header;
