import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/lib/helpers";

function FlightDeals() {
  return (
    <section className="py-10 px-3 flex flex-col justify-start items-start gap-6 md:px-[64px]">
      <div className="w-full flex justify-between items-start leading-8 text-lg md:text-2xl gap-2">
        <h3 className="font-bold">
          Find your next adventure with these{" "}
          <span className="text-primary">flight deals</span>
        </h3>

        <div className="flex justify-between items-center hover:underline">
          <p>All</p>
          <ArrowRight />
        </div>
      </div>

      <div className="w-full grid gap-10 grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
          <Image
            src="/images/flight-deals-1.png"
            alt="flight-deals-1"
            width={411}
            height={397}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <div className="text-lg font-semibold flex justify-between items-center capitalize">
              <p>
                The bund, <span className="text-primary">Shanghai</span>
              </p>
              <p>{formatCurrency(598)}</p>
            </div>
            <p className="text-sm">China&apos;s most international city</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
          <Image
            src="/images/flight-deals-2.png"
            alt="flight-deals-1"
            width={411}
            height={397}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <div className="text-lg font-semibold flex justify-between items-center capitalize">
              <p>
                sydney opera house, <span className="text-primary">Sydney</span>
              </p>
              <p>{formatCurrency(981)}</p>
            </div>
            <p className="text-sm">Take a stroll along the famous harbor</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
          <Image
            src="/images/flight-deals-3.png"
            alt="flight-deals-1"
            width={411}
            height={397}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <div className="text-lg font-semibold flex justify-between items-center capitalize">
              <p>
                Kōdaiji Temple, <span className="text-primary">Kyoto</span>
              </p>
              <p>{formatCurrency(633)}</p>
            </div>
            <p className="text-sm">Step back in time in the Gion district</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start rounded-lg card_shadow lg:col-span-3">
          <Image
            src="/images/flight-deals-4.png"
            alt="flight-deals-4"
            width={1312}
            height={400}
            className="rounded-tl-lg rounded-tr-lg mx-auto"
          />

          <div className="w-full py-4 px-6">
            <div className="text-lg font-semibold flex justify-between items-center capitalize">
              <p>
                Tsavo East National Park,{" "}
                <span className="text-primary">Kenya</span>
              </p>
              <p>{formatCurrency(1248)}</p>
            </div>
            <p className="text-sm">
              Named after the Tsavo River, and opened in April 1984, Tsavo East
              National Park is one of the oldest parks in Kenya. It is located
              in the semi-arid Taru Desert.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlightDeals;
