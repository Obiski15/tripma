import Image from "next/image";

import { formatCurrency } from "@/lib/helpers";

import ShareItinerary from "./components/ShareItinerary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function page() {
  return (
    <section>
      <Header />
      <main className="flex flex-col justify-between items-start gap-10 px-3 py-3 md:px-10 min-[880px]:flex-row min-[880px]:gap-20">
        <div className="w-full flex flex-col justify-start items-start gap-12 min-[880px]:w-[70%]">
          <p className="bg-[#EAFFFB] text-[#007B65] border border-[#007B65] rounded-md p-4 pl-6 text-base">
            Your flight has been booked successfully! Your confirmation number
            is #381029404387
          </p>

          <div className="flex flex-col justify-start items start gap-6">
            <h3 className="text-primary font-bold text-2xl">
              Bon voyage, Emmanuel
            </h3>
            <p className="font-bold text-lg">
              Confirmation number: #381029404387
            </p>
            <p>
              Thank you for booking your travel with Tripma! Below is a summary
              of your trip to Narita airport in Tokyo, Japan. We’ve sent a copy
              of your booking confirmation to your email address. You can also
              find this page again in{" "}
              <span className="text-primary cursor-pointer hover:underline">
                My trips
              </span>
              .
            </p>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            <h3 className="text-2xl font-bold">Flight summary</h3>
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <h3 className="text-lg font-semibold">
                Departing February 25th, 2025
              </h3>

              <div className="w-full flex justify-start items-center border-border border">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/airline.png"
                    alt="airline"
                    fill={true}
                    className="rounded-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex justify-start items-start py-2 px-4 text-base">
                  <div className="flex-1 border-red-500 flex flex-col justify-start items-start md-[880px]:flex-row">
                    <div className="flex-1">
                      <p className="text-[#27273F]">16h 34m</p>
                      <p>Hawaiian Airlines</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#27273F]">7:00AM - 4:15PM</p>
                      <p>value</p>
                    </div>
                  </div>

                  <div className="flex-1 border-red-500 flex flex-col justify-start items-start md-[880px]:flex-row">
                    <div className="w-full flex-1">
                      <p className="text-[#27273F]">1 stop</p>
                      <p>2h 45m in HNL</p>
                    </div>

                    <div className="w-full flex-1">
                      <p className="text-[#27273F]">{formatCurrency(645)}</p>
                      <p>round trip</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base">
                Seat 9F (economy, window), 1 checked bag
              </p>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-3">
              <h3 className="text-lg font-semibold">
                Arriving February 25th, 2025
              </h3>

              <div className="w-full flex justify-start items-center border-border border">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/airline.png"
                    alt="airline"
                    fill={true}
                    className="rounded-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex justify-start items-start py-2 px-4 text-base">
                  <div className="flex-1 border-red-500 flex flex-col justify-start items-start md-[880px]:flex-row">
                    <div className="w-full flex-1">
                      <p className="text-[#27273F]">16h 34m</p>
                      <p>Hawaiian Airlines</p>
                    </div>
                    <div className="w-full flex-1">
                      <p className="text-[#27273F]">7:00AM - 4:15PM</p>
                      <p>value</p>
                    </div>
                  </div>

                  <div className="flex-1 border-red-500 flex flex-col justify-start items-start md-[880px]:flex-row">
                    <div className="w-full flex-1">
                      <p className="text-[#27273F]">1 stop</p>
                      <p>2h 45m in HNL</p>
                    </div>

                    <div className="w-full flex-1">
                      <p className="text-[#27273F]">{formatCurrency(645)}</p>
                      <p>round trip</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base">
                Seat 9F (economy, window), 1 checked bag
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-6 min-[880px]:w-[50%]">
            <h3 className="font-bold text-2xl">Price breakdown</h3>

            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="w-full flex justify-between items-start">
                <p>Departing flight</p>
                <p>{formatCurrency(500)}</p>
              </div>
              <div className="w-full flex justify-between items-start">
                <p>Arriving flight</p>
                <p>{formatCurrency(500)}</p>
              </div>
              <div className="w-full flex justify-between items-start">
                <p>Seat Upgrade(Business)</p>
                <p>{formatCurrency(500)}</p>
              </div>
              <div className="w-full flex justify-between items-start">
                <p>Baggage fees</p>
                <p>{formatCurrency(500)}</p>
              </div>
              <div className="w-full flex justify-between items-start text-[#27273F] py-2 font-semibold border-y-[1px] border-border">
                <p>Amount paid</p>
                <p>{formatCurrency(2000)}</p>
              </div>
            </div>
          </div>

          <ShareItinerary />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-12 min-[880px]:w-[30%]">
          <div className="w-full flex flex-col justify-start items-start gap-6">
            <h3 className="text-2xl font-bold">
              Shop <span className="text-primary">hotels</span>
            </h3>
            <p className="text-lg">
              Tripma partners with thousands of hotels to get you the best deal.
              Save up to 30% when you add a hotel to your trip.
            </p>

            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full card_shadow">
                <Image
                  src="/images/payment-confirm-hotel-1.png"
                  width={400}
                  height={247}
                  alt="hotel-1"
                  className="mx-auto rounded-md"
                />
                <div className="flex flex-col py-4 px-6 gap-1">
                  <div className="w-full flex justify-between items-start">
                    <p className="flex-1">Hotel the flag</p>
                    <p>{formatCurrency(373)}</p>
                  </div>
                  <p>Modern hotel in the heart of Osaka</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            <h3 className="text-2xl font-bold">
              Find unique <span className="text-primary">experiences</span>
            </h3>
            <p className="text-lg">
              Find events and authentic cultrual experiences available
              exclusively to Tripma users.
            </p>

            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full card_shadow">
                <Image
                  src="/images/payment-confirm-event-1.png"
                  width={400}
                  height={247}
                  alt="hotel-1"
                  className="mx-auto rounded-md"
                />
                <div className="flex flex-col py-4 px-6 gap-1">
                  <div className="w-full flex justify-between items-start">
                    <p className="flex-1">Hotel the flag</p>
                    <p>{formatCurrency(373)}</p>
                  </div>
                  <p>Modern hotel in the heart of Osaka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default page;
