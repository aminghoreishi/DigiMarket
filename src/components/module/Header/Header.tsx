import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import MenuMobile from "./MenuMobile";
import Logo from "./Logo";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* منوی موبایل */}
        <div className="lg:hidden">
          <MenuMobile />
        </div>

        {/* لوگو */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* سرچ بار فقط دسکتاپ */}
     
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        {/* دکمه‌ها فقط دسکتاپ */}
        <div className="hidden lg:block">
          <Buttons />
        </div>
      </div>
    </header>
  );
}

export default Header;