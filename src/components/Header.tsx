import NavBar from "./NavBar";
import Logo from "./Logo";

function Header() {
  return (
    <header className="py-3 px-3 flex justify-between items-center md:px-6">
      <div className="p-3 pl-0 md:p-6">
        <Logo />
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
