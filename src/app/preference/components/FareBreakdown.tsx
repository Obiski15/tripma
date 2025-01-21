"use client";

import { format, intlFormat } from "date-fns";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

import { useFlightOffer } from "@/services/flights/useFlightOffer";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { IPassengerForm } from "@/app/passenger/types";
import { IFlightOffersData } from "@/services/types";
import { formatCurrency } from "@/lib/helpers";
import { toast } from "@/hooks/use-toast";
import {
  PASSENGER_INFORMATION_SESSION_KEY,
  SELECTED_FLIGHT_SESSION_KEY,
} from "@/lib/constants";

import DummyFareBreakdown from "./dummy/DummyFareBreakdown";
import { Button } from "@/components/ui/button";
import ErrorMessage from "./ErrorMessage";

function FareBreakdown() {
  const { value: selectedFlight } = useSessionStorage<IFlightOffersData | null>(
    SELECTED_FLIGHT_SESSION_KEY,
    null
  );
  const { value: passengerInformation } =
    useSessionStorage<IPassengerForm | null>(
      PASSENGER_INFORMATION_SESSION_KEY,
      null
    );

  const { mutate, isLoading, error, data } = useFlightOffer();
  const router = useRouter();

  useEffect(() => {
    if (!selectedFlight) return;

    mutate(selectedFlight!);
  }, [selectedFlight, mutate]);

  return isLoading ? (
    <DummyFareBreakdown />
  ) : error ? (
    <ErrorMessage />
  ) : (
    <section className="w-full flex-1 backdrop-blur-24 md:w-auto md:min-h-screen">
      {data?.data?.flightOffers?.map((offer) => (
        <div key={offer?.id}>
          <div className="flex flex-col justify-between items-center text-background gap-[1px] min-[1320px]:flex-row">
            <div className="w-full flex-1 flex justify-between items-center bg-[#27273F] min-[1320px]:w-auto">
              <div className="py-4 px-6">
                <p className="text-2xl font-extrabold">
                  {offer?.itineraries[0]?.segments?.[0]?.departure?.iataCode}
                </p>
                <p className="text-xs">California, us</p>
              </div>
              <ArrowRight />
              <div className="py-4 px-6">
                <p className="text-2xl font-extrabold">
                  {offer?.itineraries[0]?.segments?.at(-1)?.arrival?.iataCode}
                </p>
                <p className="text-xs">California, us</p>
              </div>
            </div>

            <div className="w-full flex-1 flex justify-between items-center gap-2 min-[1320px]:w-auto">
              <div className="py-5 px-6 bg-[#605DEC]">
                <p>
                  {`${intlFormat(
                    offer?.itineraries[0]?.segments?.[0]?.departure?.at,
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )} | ${format(
                    offer?.itineraries[0]?.segments?.[0]?.departure?.at,
                    "p"
                  )}`}
                </p>
                <p className="text-xs">Departing</p>
              </div>
              <div className="py-5 px-6 bg-[#27273F]">
                <p>
                  {`${intlFormat(
                    offer?.itineraries[0]?.segments?.at(-1)?.arrival?.at ??
                      new Date(),
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )} | ${format(
                    offer?.itineraries[0]?.segments?.at(-1)?.arrival?.at ??
                      new Date(),
                    "p"
                  )}`}
                </p>
                <p className="text-xs">Arriving</p>
              </div>
            </div>
          </div>

          <div className="py-3 px-4 flex flex-col gap-1">
            <p className="py-2 font-semibold text-lg">Flight fare breakdown</p>
            <div className="w-full">
              <div className="rounded-lg py-4 flex flex-col gap-3">
                <div className="w-full flex flex-col justify-start items-start gap-3 text-[#27273F] font-semibold">
                  <h3 className="text-lg">Flight Summary</h3>

                  <div className="w-full flex justify-between items-center gap-2">
                    <p>
                      Flights x {offer?.travelerPricings?.length} Travellers
                    </p>
                    <p> {formatCurrency(+offer?.price?.grandTotal)}</p>
                  </div>

                  <div className="w-full flex justify-between items-center gap-2">
                    <p>Taxes and Fees</p>
                    <p>
                      {formatCurrency(
                        +offer?.price?.grandTotal - +offer?.price?.base
                      )}
                    </p>
                  </div>

                  <div className="w-full flex justify-between items-center gap-2">
                    <p>Discount</p>
                    <p>{formatCurrency(0)}</p>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center gap-2 py-3 font-semibold border-t">
                  <h3 className="text-3xl">Trip total</h3>
                  <h1 className="text-4xl text-[#27273F]">
                    {formatCurrency(+offer?.price?.grandTotal)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full py-2 px-3 flex justify-end items-center md:px-6">
        <Button
          onClick={() => {
            if (!passengerInformation)
              return toast({
                variant: "destructive",
                description: "Missing passenger Information",
              });
            router.push("/payment/pay");
          }}
        >
          Pay now
        </Button>
      </div>
    </section>
  );
}

export default FareBreakdown;
