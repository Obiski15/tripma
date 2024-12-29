import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function Hotels() {
  return (
    <section className="py-10 px-3 flex flex-col justify-start items-start gap-6 md:px-[64px]">
      <div className="w-full flex justify-between items-start gap-2 text-lg leading-8 md:text-2xl">
        <h3 className="font-bold">
          Explore unique <span className="text-[#41C6AF]">places to stay</span>
        </h3>

        <div className="flex justify-between items-center hover:underline">
          <p>All</p>
          <ArrowRight />
        </div>
      </div>

      <div className="w-full grid gap-10 grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
          <Image
            src="/images/hotel-1.png"
            alt="hotel-1"
            width={411}
            height={397}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <p className="text-lg font-semibold">
              Stay among the atolls in{" "}
              <span className="text-primary">Maldives</span>
            </p>
            <p className="text-sm">
              From the 2nd century AD, the islands were known as the
              &lsquo;Money Isles&rsquo; due to the abundance of cowry shells, a
              currency of the early ages.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
          <Image
            src="/images/hotel-2.png"
            alt="hotel-2"
            width={411}
            height={397}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <p className="text-lg font-semibold">
              Experience the Ourika Valley in{" "}
              <span className="text-primary">Morocco</span>
            </p>
            <p className="text-sm">
              Morocco’s Hispano-Moorish architecture blends influences from
              Berber culture, Spain, and contemporary artistic currents in the
              Middle East.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
          <Image
            src="/images/hotel-3.png"
            alt="hotel-3"
            width={411}
            height={397}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <p className="text-lg font-semibold">
              Live traditionally in{" "}
              <span className="text-primary">Mongolia</span>
            </p>
            <p className="text-sm">
              Traditional Mongolian yurts consists of an angled latticework of
              wood or bamboo for walls, ribs, and a wheel.
            </p>
          </div>
        </div>
      </div>

      <section className="w-full flex justify-center items-center px-6 py-10">
        <Button>Explore more stays</Button>
      </section>
    </section>
  );
}

export default Hotels;
