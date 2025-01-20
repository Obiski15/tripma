export interface IAirport {
  address: {
    countryName: string;
    cityName: string;
  };
  name: string;
  iataCode: string;
}

export interface IFlightOffersProperties {
  adults: number;
  children: number;
  travelClass: string;
  returnDate?: string;
  departureDate: string;
  originLocationCode: string;
  destinationLocationCode: string;
}

interface IFlightOffersPricingData {
  id: number;
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        at: Date;
      };
      arrival: {
        iataCode: string;
        at: Date;
      };
      numberOfStops: number;
      carrierCode: string;
      duration: string;
      number: number;
      id: number;
    }[];
  }[];
  price: {
    grandTotal: number;
    currency: string;
    base: number;
    total: number;
    fees: {
      amount: number;
    }[];
  };
  travelerPricings: {
    travelerId: number;
    fareOption: string;
    travelerType: string;
    price: {
      base: number;
      currency: string;
      total: number;
    };
  }[];
}

export interface IFlightOffersData extends IFlightOffersPricingData {
  oneWay: boolean;
  numberOfBookableSeats: number;
}

export interface IFlightOffers {
  data: IFlightOffersData[];
  dictionaries: {
    carriers: {
      [key: string]: string;
    };
  };
}

export interface IFlightOffersPricing {
  type: "flight-offers-pricing";
  data: { flightOffers: IFlightOffersPricingData[] };
  dictionaries: {
    carriers: {
      [key: string]: string;
    };
  };
}

export interface ISeatMapData {
  id: string;
  number: string;
  carrierCode: string;
  class: string;
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  type: "seatmap";
  flightOfferId: string;
  decks: {
    deckConfiguration: {
      startSeatRow: number;
      endSeatRow: number;
      exitRowsX?: number[];
    };
    deckType: string;
    seats: {
      cabin: "FIRST" | "ECONOMY" | "BUSINESS" | "ECONOMY_PREMIUM";
      number: string;
      travelerPricing: {
        travelerId: string;
        seatAvailabilityStatus: string;
      }[];
    }[];
  }[];
}

export interface ISeatMap {
  meta: {
    count: number;
  };
  data: ISeatMapData[];
}
