import { generateAmadeusToken } from "../generateAmadeusToken";
import { IAirport } from "../types";

export async function fetchAirports(
  keyword: string
): Promise<{ data: IAirport[] }> {
  const token = await generateAmadeusToken();

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&sort=analytics.travelers.score&view=LIGHT&keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Something went wrong. Pls try again");

  const result = await res.json();

  return result;
}
