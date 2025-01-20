import { Dispatch, SetStateAction, useMemo } from "react";
import { Info } from "lucide-react";

import { ISeatMapData } from "@/services/types";

import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

interface Properties {
  setActiveMap: Dispatch<SetStateAction<number>>;
  setSelectedSeats: Dispatch<
    SetStateAction<{
      [key: number]: { [key: number]: string };
    }>
  >;
  selectedSeats: {
    [key: number]: { [key: number]: string };
  };
  passengerIndex: number;
  data: ISeatMapData;
  activeMap: number;
  index: number;
}

function Map({
  data,
  index,
  activeMap,
  setActiveMap,
  selectedSeats,
  passengerIndex,
  setSelectedSeats,
}: Properties) {
  const groupedSeats = useMemo(() => {
    return Object.values(
      data.decks[0].seats.reduce(
        (
          acc: {
            [key: number]: {
              number: string;
              travelerPricing: {
                travelerId: string;
                seatAvailabilityStatus: string;
              }[];
            }[];
          },
          seat
        ) => {
          if (!acc[parseInt(seat.number)]) {
            acc[parseInt(seat.number)] = [];
          }

          acc[parseInt(seat.number)].push(seat);

          return acc;
        },
        {}
      )
    );
  }, [data]);

  function handleSeatSelection(
    seatIndex: number,
    seatNumber: string,
    passengerIndex: number
  ) {
    setSelectedSeats((seats) => {
      return {
        ...seats,
        [passengerIndex]: {
          ...seats[passengerIndex],
          [seatIndex]: seatNumber,
        },
      };
    });

    if (activeMap === 5 - 1) {
      setActiveMap(0);
      return;
    }
    setActiveMap((i) => i + 1);
  }

  return (
    <div
      style={{
        transform: `translateX(${(index - activeMap) * 150}%)`,
      }}
      className="transition-all h-[400px] overflow-y-scroll w-fit flex flex-col gap-2 mx-auto absolute"
    >
      {groupedSeats.map((seatRow, rowIndex) => {
        return (
          <div key={rowIndex}>
            <div className="flex gap-4 justify-start items-center">
              {seatRow.slice(0, 3).map((s) => (
                <TooltipProvider key={s.number}>
                  <Tooltip>
                    <TooltipTrigger
                      className="disabled:cursor-not-allowed"
                      disabled={
                        Object.values(selectedSeats)
                          .filter((_, selIndex) => selIndex !== passengerIndex)
                          .map((v) => v[index])
                          .includes(s.number) ||
                        !(
                          s.travelerPricing[
                            passengerIndex
                          ].seatAvailabilityStatus.toLowerCase() === "available"
                        )
                      }
                    >
                      <p
                        className={`w-[22px] h-[32px] rounded-sm ${
                          Object.values(selectedSeats)
                            .map((val) => val[index])
                            .includes(s.number)
                            ? "bg-green-500"
                            : s.travelerPricing[
                                passengerIndex
                              ].seatAvailabilityStatus.toLowerCase() ===
                              "available"
                            ? "bg-seat"
                            : "bg-[#E9E8FC]"
                        }`}
                        onClick={() => {
                          handleSeatSelection(index, s.number, passengerIndex);
                        }}
                      ></p>
                    </TooltipTrigger>
                    <TooltipContent>{s.number}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}

              <p>{parseInt(seatRow[0].number)}</p>

              {seatRow.slice(3).map((s) => (
                <TooltipProvider key={s.number}>
                  <Tooltip>
                    <TooltipTrigger
                      className="disabled:cursor-not-allowed"
                      disabled={
                        Object.values(selectedSeats)
                          .filter((_, selIndex) => selIndex !== passengerIndex)
                          .map((v) => v[index])
                          .includes(s.number) ||
                        !(
                          s.travelerPricing[
                            passengerIndex
                          ].seatAvailabilityStatus.toLowerCase() === "available"
                        )
                      }
                    >
                      <p
                        className={`w-[22px] h-[32px] rounded-sm ${
                          Object.values(selectedSeats)
                            .map((val) => val[index])
                            .includes(s.number)
                            ? "bg-green-500"
                            : s.travelerPricing[
                                passengerIndex
                              ].seatAvailabilityStatus.toLowerCase() ===
                              "available"
                            ? "bg-seat"
                            : "bg-[#E9E8FC]"
                        }`}
                        onClick={() => {
                          handleSeatSelection(index, s.number, passengerIndex);
                        }}
                      ></p>
                    </TooltipTrigger>
                    <TooltipContent>{s.number}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            {data.decks[0].deckConfiguration.exitRowsX?.includes(
              parseInt(seatRow[0].number)
            ) && (
              <div className="py-1 flex justify-start gap-1 items-center">
                <Info /> <p>Exit row</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Map;
