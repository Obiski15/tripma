import { useMutation } from "@tanstack/react-query";

import { flightOffer } from "./flightApi";

export function useFlightOffer() {
  const {
    data,
    error,
    mutate,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["flightOffer"],
    mutationFn: flightOffer,
  });
  return { mutate, data, error, isLoading };
}
