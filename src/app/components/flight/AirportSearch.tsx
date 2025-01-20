"use client";

import { useFormContext } from "react-hook-form";
import { Search } from "lucide-react";
import { useState } from "react";

import { useAirports } from "@/services/airport/useAirports";
import { RECENT_AIRPORT_SEARCH_KEY } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAirport } from "@/services/types";

import { Input } from "@/components/ui/input";

function AirportSearch({
  placeholder,
  field,
}: {
  placeholder: string;
  field: string;
}) {
  const { value: recentAirportSearch } = useLocalStorage<IAirport[]>(
    RECENT_AIRPORT_SEARCH_KEY,
    []
  );
  const [query, setQuery] = useState<string>("");
  const { isFetchingAirports, isAirportsFetched, airports, error } =
    useAirports(query);
  const { setValue } = useFormContext();

  function handleClick(airport: IAirport) {
    setValue(
      field,
      `${airport.iataCode}, ${airport.name}, ${airport.address.cityName}, ${airport.address.countryName}`
    );
  }

  return (
    <div className="flex flex-col justify-start items-center gap-6 bg-background text-[#27273F]">
      <div className="w-full px-4">
        <div className="flex justify-start items-center p-1 rounded-md border-border border">
          <Search className="text-foreground" />
          <Input
            placeholder={placeholder}
            className="border-none shadow-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {isFetchingAirports ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-[#27273f]">{error.message}</p>
      ) : isAirportsFetched && !airports?.data?.length ? (
        <p className="text-[#27273F]">No match found </p>
      ) : query.length < 2 && query.length > 0 ? (
        <p>Keep Typing to reveal options</p>
      ) : (
        ""
      )}

      <div className="w-full">
        {!isAirportsFetched &&
        !query.length &&
        !!recentAirportSearch.length &&
        !isFetchingAirports ? (
          <div className="w-full text-foreground">
            <h3 className="text-lg pl-4 font-semibold">Recent Searches</h3>

            <div className="w-full">
              {recentAirportSearch.map((airport) => (
                <div
                  key={airport.iataCode}
                  className="w-full p-4 flex justify-between items-center hover:bg-primary/30 cursor-pointer"
                  onClick={() => {
                    handleClick(airport);
                  }}
                >
                  <div>
                    <p className="capitalize text-base font-semibold">
                      {airport?.address?.cityName},{" "}
                      {airport?.address?.countryName}
                    </p>
                    <p className="text-xs">
                      {airport?.name} ({airport?.iataCode})
                    </p>
                  </div>
                  <p className="border border-border p-2 text-center uppercase rounded-sm">
                    {airport?.iataCode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          "no search record found"
        )}

        {airports?.data?.map((airport) => (
          <div
            key={airport?.iataCode}
            className="w-full p-4 flex justify-between items-center hover:bg-primary/30 cursor-pointer"
            onClick={() => {
              handleClick(airport);
            }}
          >
            <div>
              <p className="capitalize text-base font-semibold">
                {airport?.address?.cityName}, {airport?.address?.countryName}
              </p>
              <p className="text-xs">
                {airport?.name} ({airport?.iataCode})
              </p>
            </div>
            <p className="border border-border p-2 text-center uppercase rounded-sm">
              {airport?.iataCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirportSearch;
