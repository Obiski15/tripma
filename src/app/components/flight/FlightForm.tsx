"use client";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { date, number, object, ObjectSchema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { format } from "date-fns";
import {
  Minus,
  Plus,
  User,
  PlaneLanding,
  PlaneTakeoff,
  CalendarDaysIcon,
} from "lucide-react";

import { RECENT_AIRPORT_SEARCH_KEY } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAirport } from "@/services/types";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AirportSearch from "./AirportSearch";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

interface IForm {
  travelClass: "FIRST" | "ECONOMY" | "BUSINESS" | "ECONOMY_PREMIUM";
  tripType: "round" | "one way";
  destination: string;
  location: string;
  date: DateRange;
  passengers: {
    adult: number;
    minor: number;
  };
}

function FlightForm() {
  const { setValue: setRecentAirportSearch } = useLocalStorage<IAirport[]>(
    RECENT_AIRPORT_SEARCH_KEY,
    []
  );
  const router = useRouter();

  const schema: ObjectSchema<IForm> = object({
    travelClass: string<"FIRST" | "ECONOMY" | "BUSINESS" | "ECONOMY_PREMIUM">()
      .required("Travel class is required")
      .uppercase(),
    tripType: string<"round" | "one way">().required("Trip type is required"),
    destination: string().required("Desired destination is required"),
    date: object({
      from: date().required("A departure date is required to proceed"),
      to: date().optional(),
    }),
    location: string().required("Current location is required"),
    passengers: object({
      adult: number()
        .default(1)
        .positive()
        .min(1, "At least one adult passenger is required")
        .required("At least on passenger is required "),
      minor: number().default(0).min(0),
    }),
  });

  const form = useForm<IForm>({
    defaultValues: {
      passengers: {
        adult: 1,
        minor: 0,
      },
      tripType: "round",
    },
    resolver: yupResolver(schema),
  });

  const watchedPassengers = useWatch({
    control: form.control,
    name: "passengers",
  });

  const watchedDate = useWatch({
    control: form.control,
    name: "date",
  });

  useEffect(() => {
    if (!!Object.keys(form.formState.errors).length) {
      const error = form.formState.errors;
      toast({
        description:
          error.location?.message ||
          error.destination?.message ||
          error.date?.message ||
          error.travelClass?.message ||
          error.passengers?.adult?.message ||
          error.passengers?.minor?.message,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [form.formState.errors]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    setRecentAirportSearch((airports) => {
      const newAirportSearch: IAirport[] = [];

      [data.location, data.destination].forEach((val) => {
        const address = val.split(", ");
        if (airports.map((airport) => airport.iataCode).includes(address[0]))
          return;
        newAirportSearch.push({
          iataCode: address[0],
          name: address[1],
          address: {
            cityName: address[2],
            countryName: address[3],
          },
        });
      });
      return [
        ...newAirportSearch,
        ...airports.slice(0, newAirportSearch.length === 1 ? 2 : 3),
      ];
    });

    const returnDate = data.date.to ? new Date(data.date.to) : "";
    const departureDate = new Date(data.date.from!);

    router.push(
      `/flights?originLocationCode=${
        data.location.split(", ")[0]
      }&destinationLocationCode=${
        data.destination.split(", ")[0]
      }&departureDate=${`${departureDate.getFullYear()}-${(
        departureDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${departureDate
        .getDate()
        .toString()
        .padStart(2, "0")}`}${
        returnDate
          ? `&returnDate=${`${returnDate.getFullYear()}-${(
              returnDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${returnDate
              .getDate()
              .toString()
              .padStart(2, "0")}`}`
          : ""
      }&adults=${data.passengers.adult}&travelClass=${data.travelClass}${
        data.passengers.minor ? `&children=${data.passengers.minor}` : ""
      }&locationCity=${data.location.split(", ")[2]}&destinationCity=${
        data.destination.split(", ")[2]
      }`
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-between items-center gap-4 p-1 md:flex-row md:card_shadow md:rounded-md md:gap-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-between items-start gap-3">
          <Popover>
            <PopoverTrigger className="flex justify-between items-center px-3 py-2 gap-2">
              <PlaneTakeoff width={30} height={30} />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="shadow-none cursor-pointer"
                        placeholder="From where?"
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] h-[300px] overflow-y-scroll !px-0">
              <AirportSearch placeholder="from?" field="location" />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex justify-between items-center px-3 py-2 gap-2">
              <PlaneLanding width={30} height={30} />

              <FormField
                name="destination"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Where to?"
                        className="shadow-none cursor-pointer"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] h-[300px] overflow-y-scroll !px-0">
              <AirportSearch placeholder="to?" field="destination" />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full flex justify-center items-start gap-3 md:justify-start">
          <Popover>
            <PopoverTrigger className="flex justify-start items-center px-3 py-2 gap-2">
              <CalendarDaysIcon />
              <p>
                {!watchedDate?.from
                  ? "Pick a date"
                  : `${
                      !watchedDate?.from ? "" : format(watchedDate.from!, "PPP")
                    }${
                      !watchedDate?.to
                        ? ""
                        : `-${format(watchedDate.to!, "PPP")}`
                    }`}
              </p>
            </PopoverTrigger>

            <PopoverContent className="card_shadow z-[9999] bg-background flex flex-col p-6 border-2">
              <FormField
                name="tripType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="w-3 h-3">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="w-full flex p-3 justify-start items-center gap-4 text-foreground py-4"
                      >
                        <FormItem className="flex justify-between items-center gap-1">
                          <FormControl>
                            <RadioGroupItem value="round" />
                          </FormControl>
                          <FormLabel className="!m-0">Round Trip</FormLabel>
                        </FormItem>

                        <FormItem className="flex justify-between items-center gap-1">
                          <FormControl>
                            <RadioGroupItem value="one way" />
                          </FormControl>
                          <FormLabel className="!m-0">One Way</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Calendar
                        className="w-full text-foreground"
                        disabled={{ before: new Date() }}
                        onSelect={field.onChange}
                        selected={field.value}
                        numberOfMonths={2}
                        initialFocus
                        mode="range"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex justify-start items-center px-3 py-2 gap-2 border-border">
              <User />
              <p>
                {watchedPassengers?.adult + watchedPassengers?.minor} Passengers
              </p>
            </PopoverTrigger>

            <PopoverContent className="text-foreground flex flex-col justify-start items-center p-4 gap-2 rounded-md">
              <div className="w-full flex justify-between items-center gap-2">
                <p>Travel Class</p>

                <FormField
                  name="travelClass"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
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
              </div>

              <FormField
                name="passengers.adult"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex gap-2 justify-between items-center">
                    <p>Adults</p>
                    <div className="flex justify-between items-center gap-8">
                      <Minus
                        className="bg-primary/30 p-1 text-primary"
                        onClick={() => {
                          if (field.value === 0) return;

                          form.setValue("passengers.adult", field.value - 1);
                        }}
                      />
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="w-20 h-10 text-center"
                          readOnly
                        />
                      </FormControl>
                      <Plus
                        className="bg-primary/30 p-1 text-primary"
                        onClick={() => {
                          if (
                            watchedPassengers?.adult +
                              watchedPassengers?.minor ===
                            9
                          )
                            return toast({
                              description:
                                "Number of passengers cannot exceed 9",
                              variant: "destructive",
                            });
                          form.setValue("passengers.adult", field.value + 1);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="passengers.minor"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex gap-2 justify-between items-center">
                    <p>Minors</p>
                    <div className="flex justify-between items-center gap-8">
                      <Minus
                        className="bg-primary/30 p-1 text-primary"
                        onClick={() => {
                          if (field.value === 0) return;

                          form.setValue("passengers.minor", field.value - 1);
                        }}
                      />
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="w-20 h-10 text-center"
                          readOnly
                        />
                      </FormControl>
                      <Plus
                        className="bg-primary/30 p-1 text-primary"
                        onClick={() => {
                          if (
                            watchedPassengers?.adult +
                              watchedPassengers?.minor ===
                            9
                          )
                            return toast({
                              description:
                                "Number of passengers cannot exceed 9",
                              variant: "destructive",
                            });
                          form.setValue("passengers.minor", field.value + 1);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="py-5 md:py-0 md:px-2">
          <Button>Search</Button>
        </div>
      </form>
    </Form>
  );
}

export default FlightForm;
