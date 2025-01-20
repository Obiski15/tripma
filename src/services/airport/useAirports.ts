import { useQuery } from "@tanstack/react-query";

import { useDebounceTerm } from "@/hooks/useDebounceTerm";
import { fetchAirports } from "./airportApi";

export function useAirports(query: string) {
  const debouncedTerm = useDebounceTerm(query, 500);

  const {
    error,
    data: airports,
    isFetched: isAirportsFetched,
    isLoading: isFetchingAirports,
  } = useQuery({
    queryKey: ["airports", debouncedTerm],
    queryFn: () => fetchAirports(debouncedTerm),
    enabled: !!debouncedTerm && debouncedTerm.length >= 2,
  });
  return { airports, isFetchingAirports, isAirportsFetched, error };
}
