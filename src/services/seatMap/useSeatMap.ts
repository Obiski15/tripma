import { useMutation } from "@tanstack/react-query";

import { seatMap } from "./seatMapApi";

export function useSeatMap() {
  const {
    data,
    error,
    mutate,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["seatMap"],
    mutationFn: seatMap,
  });

  return { error, mutate, data, isLoading };
}
