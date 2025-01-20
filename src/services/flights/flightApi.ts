import { generateAmadeusToken } from "../generateAmadeusToken";

import {
  IFlightOffers,
  IFlightOffersData,
  IFlightOffersPricing,
  IFlightOffersProperties,
} from "../types";

export async function flightOffers(
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
): Promise<IFlightOffers> {
  const token = await generateAmadeusToken();

  const res = await fetch(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?currencyCode=USD&destinationLocationCode=${destinationLocationCode}&originLocationCode=${originLocationCode}&departureDate=${departureDate}&travelClass=${travelClass}&adults=${adults}${
      children ? `&children=${children}` : ""
    }${limit ? `&max=${limit}` : ""}${
      returnDate ? `&returnDate=${returnDate}` : ""
    }`,
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

export async function flightOffer(
  offer: IFlightOffersData
): Promise<IFlightOffersPricing> {
  const token = await generateAmadeusToken();
  const res = await fetch(
    `https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=true`,
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [{ ...offer }],
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Something went wrong. Pls try again");

  const result = await res.json();

  return result;
}
