import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "./ui/sheet";

function NavBar() {
  return (
    <nav>
      <div className="hidden p-4 justify-between items-center gap-4 md:flex">
        <Button variant="ghost">Flights</Button>
        <Button variant="ghost">Hotels</Button>
        <Button variant="ghost">Packages</Button>
        <Button variant="ghost">Sign in</Button>
        <Button>Sign up</Button>
      </div>

      <Sheet>
        <SheetTrigger>
          <MenuIcon className="md:hidden" />
        </SheetTrigger>

        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <SheetContent>
          <div className="flex flex-col justify-between items-start gap-2">
            <Button variant="ghost">Flights</Button>
            <Button variant="ghost">Hotels</Button>
            <Button variant="ghost">Packages</Button>
            <Button variant="ghost">Sign in</Button>
            <Button>Sign up</Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default NavBar;
