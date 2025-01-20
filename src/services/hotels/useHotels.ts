import { useQuery } from "@tanstack/react-query";

function useHotels() {
  const {} = useQuery({
    queryKey: ["hotels"],
    // queryFn:
  });
  return {};
}

export default useHotels;
