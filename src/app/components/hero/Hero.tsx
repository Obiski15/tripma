import { TrendingUp } from "lucide-react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DesktopFlightForm from "./DesktopFlightForm";
import MobileFlightForm from "./MobileFlightForm";

function Hero() {
  return (
    <section className="bg-hero flex flex-col items-center justify-between pt-2 pb-[80px] md:pb-[160px]">
      <h1 className="hidden bg-heroText text-[60px] bg-clip-text font-semibold bg-transparent max-w-[872px] w-full text-transparent text-center p-6 sm:text-[80px] md:text-[100px] lg:[120px] md:block">
        It&apos;s more than just a trip
      </h1>

      <DesktopFlightForm />

      <div className="w-full grid grid-cols-12 grid-rows-2 justify-between items-center gap-2 md:hidden px-2">
        <Sheet>
          <SheetTrigger className="h-full p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
            <div className="flex flex-col justify-between items-center gap-4">
              <Image
                src="/icons/flight.svg"
                alt="flight"
                width={50}
                height={50}
              />
              <p className="text-center">flight</p>
            </div>
          </SheetTrigger>

          <SheetContent className="w-full py-10">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>

            <MobileFlightForm />
          </SheetContent>
        </Sheet>

        <div className="h-full p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Image src="/icons/hotel.svg" alt="flight" width={50} height={50} />
            <p className="text-center">Stays</p>
          </div>
        </div>
        <div className="h-full p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Image src="/icons/ride.svg" alt="flight" width={50} height={50} />
            <p className="text-center">Rides</p>
          </div>
        </div>
        <div className="h-full p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Image
              src="/icons/holiday.svg"
              alt="flight"
              width={50}
              height={50}
            />
            <p className="text-center">Holidays</p>
          </div>
        </div>
        <div className="h-full p-6 flex justify-center items-center rounded-lg col-span-4 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Image
              src="/icons/property.svg"
              alt="flight"
              width={50}
              height={50}
            />
            <p className="text-center">List your property</p>
          </div>
        </div>
        <div className="h-full p-6 flex justify-center items-center rounded-lg col-span-4 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <TrendingUp width={50} height={50} />
            <p className="text-center">Business Travel</p>
          </div>
        </div>
        <div className="h-full p-6 flex justify-center  items-center rounded-lg col-span-4 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Image
              src="/icons/travel-bag.svg"
              alt="flight"
              width={50}
              height={50}
            />
            <p className="text-center">Travel Extras</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
