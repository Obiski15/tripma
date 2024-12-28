import { Plane } from "lucide-react";

import HeroForm from "./HeroForm";

function Hero() {
  return (
    <section className="bg-hero flex flex-col items-center justify-between pt-2 pb-[80px] md:pb-[160px]">
      <h1 className="hidden bg-heroText text-[60px] bg-clip-text font-semibold bg-transparent max-w-[872px] w-full text-transparent text-center p-6 sm:text-[80px] md:text-[100px] lg:[120px] md:block">
        It&apos;s more than just a trip
      </h1>

      <HeroForm />

      <div className="w-full grid grid-cols-12 grid-rows-2 justify-between items-center gap-2 md:hidden px-2">
        <div className="p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center rounded-lg col-span-3 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center rounded-lg col-span-4 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
        <div className="p-6 flex justify-center items-center rounded-lg col-span-4 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
        <div className="p-6 flex justify-center  items-center rounded-lg col-span-4 card_shadow">
          <div className="flex flex-col justify-between items-center gap-4">
            <Plane />
            <p>flight</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
