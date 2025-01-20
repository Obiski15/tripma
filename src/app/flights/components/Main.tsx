"use client";

import { useRouter, useSearchParams } from "next/navigation";
// import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Image from "next/image";
import {
  User,
  Plane,
  Calendar,
  ArrowRight,
  PlaneLanding,
  PlaneTakeoff,
} from "lucide-react";

import { useFlightOffers } from "@/services/flights/useFlightOffers";

import {
  formatCurrency,
  parseISODuration,
  dateIntervalToDuration,
} from "@/lib/helpers";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { SELECTED_FLIGHT_SESSION_KEY } from "@/lib/constants";
import { IFlightOffersData } from "@/services/types";

// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
// import {
//   Select,
//   SelectItem,
//   SelectValue,
//   SelectTrigger,
//   SelectContent,
// } from "@/components/ui/select";

// interface IForm {
//   travelClass: "FIRST" | "ECONOMY" | "BUSINESS" | "ECONOMY_PREMIUM";
//   maxPrice: number;
//   airlines: string;
// }

function Main() {
  const { value: selectedFlight, setValue: setSelectedFlight } =
    useSessionStorage<IFlightOffersData | null>(
      SELECTED_FLIGHT_SESSION_KEY,
      null
    );
  const searchParams = useSearchParams();
  // const form = useForm<IForm>({
  //   defaultValues: {},
  // });
  const router = useRouter();

  const { flightOffers, flightOffersError, isLoadingFlightOffers } =
    useFlightOffers(
      {
        originLocationCode: searchParams.get("originLocationCode") ?? "",
        departureDate: searchParams.get("departureDate") ?? "",
        destinationLocationCode:
          searchParams.get("destinationLocationCode") ?? "",
        travelClass: searchParams.get("travelClass") ?? "",
        returnDate: searchParams.get("returnDate") ?? "",
        children: +searchParams.get("children")!,
        adults: +searchParams.get("adults")!,
      },
      5
    );

  useEffect(() => {
    setSelectedFlight(null);
  }, [setSelectedFlight]);

  return (
    <main className="flex flex-col justify-between items-start gap-5 px-3 py-3">
      {isLoadingFlightOffers ? (
        <div className="mx-auto card_shadow flex flex-col gap-5 justify-between items-center p-10 rounded-md text-[#27273F]">
          <Image alt="spinner" src="/icons/spin.svg" width={50} height={50} />
          <div className="flex justify-center items-center gap-3 text-2xl font-bold capitalize">
            <p>{`${searchParams.get("locationCity")} (${searchParams.get(
              "originLocationCode"
            )})`}</p>
            <Plane />
            <p>{`${searchParams.get("destinationCity")} (${searchParams.get(
              "destinationLocationCode"
            )})`}</p>
          </div>
          <p>pls wait while we find the best fares for you.</p>
          <p className="font-semibold">
            <span>
              {searchParams.get("departureDate")
                ? format(searchParams.get("departureDate")!, "PP")
                : ""}
            </span>
            <span>
              {searchParams.get("returnDate")
                ? ` - ${format(searchParams.get("returnDate")!, "PP")}`
                : ""}
            </span>
          </p>
          <p className="font-semibold">
            {+searchParams.get("adults")! + +searchParams.get("children")!}{" "}
            Passenger(s), {searchParams.get("travelClass")}
          </p>
        </div>
      ) : flightOffersError ? (
        <div className="mx-auto p-3 font-semibold flex-flex-col justify-center items-center">
          <p className="text-3xl text-center py-5">OOps!!</p>
          <p>{flightOffersError.message}</p>
        </div>
      ) : !flightOffers?.data?.length ? (
        <p className="mx-auto text-center font-bold p-3">
          We couldn&apos;t find any result. Try adjusting your search criteria
          for more result.
        </p>
      ) : (
        <>
          <div className="w-full flex flex-col justify-start items-start gap-3 px-3 py-3 md:px-10">
            <div className="flex justify-start items-center flex-wrap gap-6 border border-border p-2 rounded-md shadow_card">
              <div className="flex justify-start items-center gap-2 py-1 px-2">
                <PlaneTakeoff />
                <p>{searchParams.get("originLocationCode")}</p>
              </div>
              <div className="flex justify-start items-center gap-2 border-l border-border py-1 px-2">
                <PlaneLanding />
                <p>{searchParams.get("destinationLocationCode")}</p>
              </div>
              <div className="flex justify-start items-center gap-2 border-l border-border py-1 px-2">
                <Calendar />
                <p>
                  <span>{searchParams.get("departureDate")}</span>
                  <span>
                    {searchParams.get("returnDate")
                      ? ` - ${searchParams.get("returnDate")}`
                      : ""}
                  </span>
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 border-l border-border py-1 px-2">
                <User />
                <p>
                  {searchParams.get("adults")} adult,{" "}
                  {searchParams.get("children")
                    ? `${searchParams.get("children")} children, `
                    : ""}{" "}
                  {searchParams.get("travelClass")}
                </p>
              </div>
            </div>
            {/* <Form {...form}>
              <form className="flex justify-start items-start gap-4">
                <Select>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Max Price" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="33">33</SelectItem>
                  </SelectContent>
                </Select>

                <FormField
                  name="travelClass"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Travel Class" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="text-foreground">
                          <SelectItem value="PREMIUM_ECONOMY">
                            PREMIUM_ECONOMY
                          </SelectItem>
                          <SelectItem value="BUSINESS">BUSINESS</SelectItem>
                          <SelectItem value="ECONOMY">ECONOMY</SelectItem>
                          <SelectItem value="FIRST">FIRST</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Select>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Airlines" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="air peace">Air Peace</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </Form> */}
          </div>

          <section className="w-full flex flex-col justify-between items-start gap-5 px-3 py-3 md:px-10 min-[880px]:flex-row min-[880px]:gap-20">
            <div className="w-full flex flex-col justify-start items-start gap-12 min-[880px]:w-[70%]">
              <div className="w-full flex flex-col justify-start items-start gap-6">
                <h3 className="text-lg font-semibold">
                  Choose your preferred flight option
                </h3>

                <div className="w-full flex flex-col justify-start items-start gap-2 border border-border p-4 rounded-lg">
                  {flightOffers?.data?.map((offer, i) => (
                    <div
                      key={i + 1}
                      className={`w-full flex justify-start items-center gap-2 border-b-[1px] border-border rounded-md           ${
                        !(selectedFlight?.id === offer?.id) &&
                        "hover:bg-primary/10"
                      } ${
                        selectedFlight?.id === offer?.id ? "bg-primary/20" : ""
                      }`}
                      onClick={() => setSelectedFlight(offer)}
                    >
                      <div className="relative min-w-10 min-h-10">
                        <Image
                          src="/images/airline.png"
                          alt="airline"
                          fill={true}
                          className="rounded-full object-cover object-center"
                        />
                      </div>

                      <div className="w-full flex flex-col gap-3 relative">
                        {offer?.itineraries?.map((itinerary, i) => (
                          <div
                            key={i + 1}
                            className="w-full flex-1 flex justify-start items-start py-2 px-4 text-base"
                          >
                            <div className="flex-1 flex flex-col justify-start items-start md-[880px]:flex-row">
                              <div className="flex-1">
                                <p className="text-[#27273F]">
                                  {parseISODuration(itinerary?.duration)?.hours}{" "}
                                  {
                                    parseISODuration(itinerary?.duration)
                                      ?.minutes
                                  }
                                </p>
                                <p>
                                  {
                                    flightOffers?.dictionaries?.carriers?.[
                                      itinerary?.segments?.[i]?.carrierCode
                                    ]
                                  }
                                </p>
                              </div>
                              <div className="flex-1">
                                <p className="text-[#27273F]">
                                  {format(
                                    itinerary?.segments?.[0]?.departure?.at,
                                    "p"
                                  )}{" "}
                                  -{" "}
                                  {format(
                                    itinerary?.segments?.at(-1)?.arrival?.at ??
                                      new Date(),
                                    "p"
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-start items-start md-[880px]:flex-row">
                              <div className="w-full flex-1">
                                {itinerary?.segments?.length > 1 ? (
                                  <>
                                    <p className="text-[#27273F]">
                                      {itinerary?.segments?.length - 1} Stop(s)
                                    </p>
                                    <p>
                                      {`${
                                        dateIntervalToDuration({
                                          start:
                                            itinerary?.segments?.[0]?.arrival
                                              ?.at ?? new Date(),
                                          end:
                                            itinerary?.segments?.at(-1)
                                              ?.departure?.at ?? new Date(),
                                        }).hours
                                      } ${
                                        dateIntervalToDuration({
                                          start:
                                            itinerary?.segments?.[0]?.arrival
                                              ?.at ?? new Date(),
                                          end:
                                            itinerary?.segments?.at(-1)
                                              ?.departure?.at ?? new Date(),
                                        }).minutes
                                      }`}
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-[#27273F]">Nonstop</p>
                                )}
                              </div>

                              <div className="w-full flex-1">
                                <p className="text-[#27273F]">
                                  {formatCurrency(offer?.price?.grandTotal)}
                                </p>
                                <p>
                                  {offer?.oneWay ? "one way" : "round trip"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="w-full flex justify-end items-center py-6">
                    <Button variant="outline">Show all flights</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-12 min-[880px]:w-[30%]">
              {!selectedFlight ? (
                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <h3 className="flex justify-start items-center gap-4 font-semibold">
                    <span className="text-lg">Price rating</span>
                    <span className="text-background bg-[#5CD6C0] px-2 py-[2px] rounded-md text-base">
                      Buy soon
                    </span>
                  </h3>

                  <div className="w-full flex flex-col justify-between items-start gap-2 text-base">
                    <p className="w-full">
                      We recommend booking soon. The average cost of this flight
                      is{" "}
                      {formatCurrency(
                        flightOffers?.data?.reduce(
                          (acc, offer) => acc + +offer?.price?.grandTotal,
                          0
                        ) / flightOffers?.data?.length
                      )}
                      , but could rise 18% to{" "}
                      {formatCurrency(
                        (flightOffers?.data?.reduce(
                          (acc, offer) => acc + +offer?.price?.grandTotal,
                          0
                        ) +
                          flightOffers?.data?.reduce(
                            (acc, offer) => acc + +offer?.price?.grandTotal,
                            0
                          ) *
                            0.18) /
                          flightOffers?.data?.length
                      )}{" "}
                      in two weeks.
                    </p>
                    <p className="w-full text-[#A1B0CC]">
                      Tripma analyzes thousands of flights, prices, and trends
                      to ensure you get the best deal.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col justify-start items-end text-[#27273F] text-base">
                  <div className="w-full flex-1 flex flex-col gap-2 border rounded-md border-border">
                    {selectedFlight?.itineraries?.map((itinerary, i) => (
                      <div
                        key={i + 1}
                        className={`w-full flex justify-start items-start gap-2 py-3 px-1 ${
                          i > 0 ? "border-t border-border" : ""
                        }`}
                      >
                        <div className="relative min-w-10 min-h-10">
                          <Image
                            src="/images/airline.png"
                            alt="airline"
                            fill={true}
                            className="rounded-full object-cover object-center"
                          />
                        </div>

                        <div className="w-full flex justify-between items-start py-2">
                          <div className="flex flex-col justify-start items-start">
                            <p>
                              {
                                flightOffers?.dictionaries?.carriers?.[
                                  itinerary?.segments?.[i]?.carrierCode
                                ]
                              }
                            </p>
                            <p className="text-foreground">
                              {itinerary?.segments
                                ?.map((seg) => seg?.number)
                                .join("-")}
                            </p>
                          </div>

                          <div className="flex flex-col justify-start items-end text-right">
                            <p>{`${
                              parseISODuration(itinerary?.duration)?.hours
                            } ${
                              parseISODuration(itinerary?.duration)?.minutes
                            }`}</p>
                            <p>
                              {format(
                                itinerary?.segments?.[0]?.departure?.at,
                                "p"
                              )}{" "}
                              -{" "}
                              {format(
                                itinerary?.segments?.at(-1)?.arrival?.at ??
                                  new Date(),
                                "p"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col justify-start items-end p-4 gap-2 font-semibold">
                    <div className="flex justify-between items-center gap-1">
                      <p>Subtotal</p>
                      <p>{formatCurrency(88)}</p>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                      <p>Taxes and fees</p>
                      <p>
                        {formatCurrency(
                          selectedFlight?.price?.fees?.reduce(
                            (acc, fee) => acc + +fee?.amount,
                            0
                          ) ?? 0
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                      <p>Total</p>

                      <p>
                        {formatCurrency(selectedFlight?.price?.grandTotal ?? 0)}
                      </p>
                    </div>
                  </div>

                  <div className="py-10">
                    <Button
                      onClick={() => router.push("/passenger")}
                      disabled={!selectedFlight}
                    >
                      Passenger Information
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="w-full flex flex-col justify-start items-start gap-12 px-3 py-3 md:px-10">
            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full flex justify-between items-start leading-8 text-lg md:text-2xl gap-2">
                <h3 className="font-bold">
                  Find your next adventure with these{" "}
                  <span className="text-primary">flight deals</span>
                </h3>

                <div className="flex justify-between items-center hover:underline">
                  <p>All</p>
                  <ArrowRight />
                </div>
              </div>

              <div className="w-full grid gap-10 grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
                  <Image
                    src="/images/flights-hotel-1.png"
                    alt="flights-hotel-1"
                    width={411}
                    height={397}
                    className="rounded-tl-lg rounded-tr-lg mx-auto"
                  />

                  <div className="w-full py-4 px-6">
                    <div className="text-lg font-semibold flex justify-between items-center capitalize">
                      <p>
                        The bund, <span className="text-primary">Shanghai</span>
                      </p>
                      <p>{formatCurrency(598)}</p>
                    </div>
                    <p className="text-sm">
                      China&apos;s most international city
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
                  <Image
                    src="/images/flights-hotel-2.png"
                    alt="flights-hotel-2"
                    width={411}
                    height={397}
                    className="rounded-tl-lg rounded-tr-lg mx-auto"
                  />

                  <div className="w-full py-4 px-6">
                    <div className="text-lg font-semibold flex justify-between items-center capitalize">
                      <p>
                        sydney opera house,{" "}
                        <span className="text-primary">Sydney</span>
                      </p>
                      <p>{formatCurrency(981)}</p>
                    </div>
                    <p className="text-sm">
                      Take a stroll along the famous harbor
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
                  <Image
                    src="/images/flights-hotel-3.png"
                    alt="flights-hotel-3"
                    width={411}
                    height={397}
                    className="rounded-tl-lg rounded-tr-lg mx-auto"
                  />

                  <div className="w-full py-4 px-6">
                    <div className="text-lg font-semibold flex justify-between items-center capitalize">
                      <p>
                        Kōdaiji Temple,{" "}
                        <span className="text-primary">Kyoto</span>
                      </p>
                      <p>{formatCurrency(633)}</p>
                    </div>
                    <p className="text-sm">
                      Step back in time in the Gion district
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full flex justify-between items-start leading-8 text-lg md:text-2xl gap-2">
                <h3 className="font-bold">
                  People in <span className="text-primary">San Francisco</span>{" "}
                  also searched for
                </h3>

                <div className="flex justify-between items-center hover:underline">
                  <p>All</p>
                  <ArrowRight />
                </div>
              </div>

              <div className="w-full grid gap-10 grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
                  <Image
                    src="/images/flights-hotel-4.png"
                    alt="flights-hotel-4"
                    width={411}
                    height={397}
                    className="rounded-tl-lg rounded-tr-lg mx-auto"
                  />

                  <div className="w-full py-4 px-6">
                    <div className="text-lg font-semibold flex justify-between items-center capitalize">
                      <p>
                        The bund, <span className="text-primary">Shanghai</span>
                      </p>
                      <p>{formatCurrency(598)}</p>
                    </div>
                    <p className="text-sm">
                      China&apos;s most international city
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
                  <Image
                    src="/images/flights-hotel-5.png"
                    alt="flights-hotel-5"
                    width={411}
                    height={397}
                    className="rounded-tl-lg rounded-tr-lg mx-auto"
                  />

                  <div className="w-full py-4 px-6">
                    <div className="text-lg font-semibold flex justify-between items-center capitalize">
                      <p>
                        sydney opera house,{" "}
                        <span className="text-primary">Sydney</span>
                      </p>
                      <p>{formatCurrency(981)}</p>
                    </div>
                    <p className="text-sm">
                      Take a stroll along the famous harbor
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start rounded-lg card_shadow">
                  <Image
                    src="/images/flights-hotel-6.png"
                    alt="flights-hotel-6"
                    width={411}
                    height={397}
                    className="rounded-tl-lg rounded-tr-lg mx-auto"
                  />

                  <div className="w-full py-4 px-6">
                    <div className="text-lg font-semibold flex justify-between items-center capitalize">
                      <p>
                        Kōdaiji Temple,{" "}
                        <span className="text-primary">Kyoto</span>
                      </p>
                      <p>{formatCurrency(633)}</p>
                    </div>
                    <p className="text-sm">
                      Step back in time in the Gion district
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Main;
