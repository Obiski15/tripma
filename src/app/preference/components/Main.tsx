"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SELECTED_FLIGHT_SESSION_KEY } from "@/lib/constants";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { IFlightOffersData } from "@/services/types";

import FareBreakdown from "./FareBreakdown";
import SeatMap from "./seatMap/SeatMap";

function Main() {
  const { value: selectedFlight } = useSessionStorage<IFlightOffersData | null>(
    SELECTED_FLIGHT_SESSION_KEY,
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (
      !selectedFlight ||
      (!selectedFlight?.itineraries?.length &&
        !selectedFlight?.travelerPricings?.length)
    )
      return router.push("/");
  }, [selectedFlight, router]);

  if (!selectedFlight) return null;

  return (
    <main className="flex flex-col-reverse justify-between items-start bg-plane bg-right md:flex-row">
      <SeatMap />
      <FareBreakdown />
    </main>
  );
}

export default Main;
