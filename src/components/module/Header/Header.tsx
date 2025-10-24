import React from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import MenuMobile from "./MenuMobile";
import Logo from "./Logo";
function Header() {
  return (
    <div className="flex justify-between relative bottom-0 right-0 shadow-2xl items-center container mx-auto py-3">
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
