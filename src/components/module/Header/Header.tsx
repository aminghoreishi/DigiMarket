import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import MenuMobile from "./MenuMobile";
import Logo from "./Logo";
import { authSessionUser, authUser } from "@/utils/auth";

async function Header() {
  const user = await authUser();
  const isLoggedIn = !!user.user;
  const isAdmin = user.user?.role === "ADMIN";
  const session = await authSessionUser();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="lg:hidden">
          <MenuMobile
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            session={session?.role}
          />
        </div>

        <div className="shrink-0">
          <Logo />
        </div>

        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        <div className="hidden lg:block">
          <Buttons />
        </div>
      </div>
    </header>
  );
}

export default Header;
