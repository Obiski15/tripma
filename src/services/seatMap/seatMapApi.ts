import { generateAmadeusToken } from "../generateAmadeusToken";
import { IFlightOffersData, ISeatMap } from "../types";

export async function seatMap(offer: IFlightOffersData): Promise<ISeatMap> {
  const token = await generateAmadeusToken();

  const res = await fetch("https://test.api.amadeus.com/v1/shopping/seatmaps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: [{ ...offer }],
    }),
  });

  if (!res.ok) throw new Error("Something went wrong. Please try again");
  const result = res.json();

  return result;
}
