"use client";

import { useEffect, useState } from "react";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useSeatMap } from "@/services/seatMap/useSeatMap";
import { IPassengerForm } from "@/app/passenger/types";
import { IFlightOffersData } from "@/services/types";
import {
  PASSENGER_INFORMATION_SESSION_KEY,
  SELECTED_FLIGHT_SESSION_KEY,
} from "@/lib/constants";

import DummySeatMap from "../dummy/DummySeatMap";
import ErrorMessage from "../ErrorMessage";
import Logo from "@/components/Logo";
import Map from "./Map";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

function SeatMap() {
  const { value: selectedFlight } = useSessionStorage<IFlightOffersData | null>(
    SELECTED_FLIGHT_SESSION_KEY,
    null
  );
  const { value: passengerInormation } =
    useSessionStorage<IPassengerForm | null>(
      PASSENGER_INFORMATION_SESSION_KEY,
      null
    );
  const [activeMap, setActiveMap] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<{
    [key: number]: { [key: number]: string };
  }>({});

  const { mutate, isLoading, error, data } = useSeatMap();

  useEffect(() => {
    if (!selectedFlight) return;

    mutate(selectedFlight!);
  }, [selectedFlight, mutate]);

  return (
    <section className="w-full flex-1 md:w-auto md:min-h-screen">
      <div className="hidden p-3 md:px-6 md:block">
        <Logo />
      </div>

      <div className="w-full flex flex-col items-start justify-start gap-3 py-3">
        {isLoading ? (
          <DummySeatMap />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="w-full flex flex-col justify-start items-start gap-4 px-3 py-4 md:px-6">
            {!passengerInormation?.passengers ? (
              <div>No passenger information</div>
            ) : (
              passengerInormation?.passengers?.map(
                (passenger, passengerIndex) => (
                  <Dialog key={passengerIndex + 1}>
                    <div
                      className={`w-full flex justify-between items-center gap-4 border-b border-input`}
                    >
                      <div className="w-[70%] flex justify-between items-center gap-4">
                        <div className="flex-1 flex flex-col justify-between items-start gap-1 p-2">
                          <p className="text-sm">
                            Passenger {passengerIndex + 1}
                          </p>
                          <p className="text-lg font-semibold">
                            {passenger?.firstName} {passenger?.lastName}
                          </p>
                        </div>
                        <div className="flex-1 flex flex-col justify-between items-start gap-1">
                          <p className="text-sm">Seat number</p>
                          <p className="text-lg font-semibold uppercase">
                            {selectedSeats[passengerIndex]
                              ? Object.values(
                                  selectedSeats[passengerIndex]
                                ).join(", ")
                              : "-"}
                          </p>
                        </div>
                      </div>

                      <DialogTrigger
                        onClick={() => {
                          setActiveMap(0);
                        }}
                        className="flex justify-end items-center gap-4 p-2 border border-primary bg-background text-primary hover:bg-primary/30 rounded-md"
                      >
                        Choose Seat(s)
                      </DialogTrigger>

                      <DialogContent className="flex flex-col gap-2 flex-wrap justify-start items-between sm:flex-row sm:gap-0">
                        <DialogDescription className="hidden"></DialogDescription>
                        <DialogHeader className="hidden"></DialogHeader>
                        <DialogTitle className="hidden"></DialogTitle>

                        <div className="flex flex-col justify-start items-start gap-2">
                          <div className="w-full flex justify-start items-center gap-1">
                            <p className="w-[22px] h-[32px] rounded-sm bg-seat"></p>
                            <p>AVAILABLE</p>
                          </div>
                          <div className="w-full flex justify-start items-center gap-1">
                            <p className="w-[22px] h-[32px] rounded-sm bg-[#E9E8FC]"></p>
                            <p>NOT AVAILABLE</p>
                          </div>
                          <div className="w-full flex justify-start items-center gap-1">
                            <p className="w-[22px] h-[32px] rounded-sm bg-green-500"></p>
                            <p>SELECTED</p>
                          </div>
                        </div>

                        <div className="min-h-[400px] flex-1 relative flex justify-center overflow-hidden">
                          {data?.data?.map((data, index) => (
                            <Map
                              data={data}
                              key={index}
                              index={index}
                              activeMap={activeMap}
                              setActiveMap={setActiveMap}
                              selectedSeats={selectedSeats}
                              passengerIndex={passengerIndex}
                              setSelectedSeats={setSelectedSeats}
                            />
                          ))}
                        </div>
                      </DialogContent>
                    </div>
                  </Dialog>
                )
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SeatMap;
