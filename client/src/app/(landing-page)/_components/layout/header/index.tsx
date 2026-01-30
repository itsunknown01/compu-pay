import HeaderActions from "./header-actions";
import HeaderIcon from "./header-icon";
import HeaderProvider from "./header-provider";
import MobileMenu from "./mobile-menu";
import NavItems from "./nav-items";

export default function Header() {
  return (
    <HeaderProvider>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <HeaderIcon />
          <NavItems />
          <HeaderActions />
          <MobileMenu />
        </div>
      </div>
    </HeaderProvider>
  );
}