import { useQuery } from "@tanstack/react-query";

import { IFlightOffersProperties } from "../types";
import { flightOffers as flightOffersAPI } from "./flightApi";

export function useFlightOffers(
  {
    adults,
    children,
    returnDate,
    travelClass,
    departureDate,
    originLocationCode,
    destinationLocationCode,
  }: IFlightOffersProperties,
  limit?: number
) {
  const {
    data: flightOffers,
    error: flightOffersError,
    isLoading: isLoadingFlightOffers,
  } = useQuery({
    queryKey: [
      "flightOffers",
      {
        adults,
        children,
        returnDate,
        travelClass,
        departureDate,
        originLocationCode,
        destinationLocationCode,
      },
      limit,
    ],
    queryFn: () =>
      flightOffersAPI(
        {
          adults,
          children,
          returnDate,
          travelClass,
          departureDate,
          originLocationCode,
          destinationLocationCode,
        },
        limit
      ),

    enabled:
      !!adults &&
      !!travelClass &&
      !!departureDate &&
      !!originLocationCode &&
      !!destinationLocationCode,
  });
  return {
    flightOffers,
    flightOffersError,
    isLoadingFlightOffers,
  };
}
