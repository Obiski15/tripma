"use client";

import { date, number, object, ObjectSchema, string } from "yup";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useState } from "react";
import {
  CalendarDaysIcon,
  Minus,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  User,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface IForm {
  location: string;
  destination: string;
  date: DateRange;
  trip: "round" | "one way";
  passengers: {
    adult: number;
    minor: number;
  };
}

function DesktopFlightForm() {
  const [numAdults, setNumAdults] = useState<number>(0);
  const [numMinors, setNumMinors] = useState<number>(0);

  const schema: ObjectSchema<IForm> = object({
    destination: string().required("Desired destination is required"),
    location: string().required("Current location is required"),
    trip: string<"round" | "one way">().required("Trip mode is required"),
    date: object({
      from: date().required(),
      to: date().optional(),
    }),
    passengers: object({
      adult: number().default(0),
      minor: number().default(0),
    }),
  });

  const form = useForm<IForm>({
    defaultValues: {
      passengers: {
        adult: 0,
        minor: 0,
      },
      trip: "round",
    },
    resolver: yupResolver(schema),
  });

  const watchedDate = useWatch({
    control: form.control,
    name: "date",
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="hidden justify-between items-center md:flex card_shadow p-1 rounded-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center px-3 py-2 gap-2">
          <PlaneTakeoff />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="From where?" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center px-3 py-2 gap-2">
          <PlaneLanding />

          <FormField
            name="destination"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Where to?" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Popover>
          <PopoverContent className="card_shadow z-[9999] bg-background flex flex-col p-6">
            <div className="w-full flex p-3 justify-start items-center gap-4 text-foreground">
              <FormField
                name="trip"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center gap-1">
                    <FormControl className="w-3 h-3">
                      <Input
                        {...field}
                        type="radio"
                        name="trip"
                        value="round"
                        checked={field.value === "round"}
                      />
                    </FormControl>
                    <FormLabel className="!m-0">Round Trip</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                name="trip"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center gap-1">
                    <FormControl className="w-3 h-3">
                      <Input
                        {...field}
                        type="radio"
                        name="trip"
                        value="one way"
                        checked={field.value === "one way"}
                      />
                    </FormControl>
                    <FormLabel className="!m-0">One Way</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Calendar
                      className="w-full text-foreground"
                      onSelect={field.onChange}
                      selected={field.value}
                      disabled={{ before: new Date() }}
                      initialFocus
                      mode="range"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </PopoverContent>

          <PopoverTrigger className="flex justify-between items-center px-3 py-2 gap-2">
            <CalendarDaysIcon />
            {!watchedDate?.from
              ? "Pick a date"
              : `${!watchedDate?.from ? "" : format(watchedDate.from!, "PPP")}${
                  !watchedDate?.to ? "" : `-${format(watchedDate.to!, "PPP")}`
                }`}
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger className="flex justify-between items-center px-3 py-2 gap-2">
            <User />
            <p>{numAdults + numMinors} Passengers</p>
          </PopoverTrigger>

          <PopoverContent className="text-foreground flex flex-col justify-start items-center p-4 gap-2 rounded-md">
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
                        setNumAdults((adult) => {
                          if (adult === 0) return 0;
                          return adult - 1;
                        });
                      }}
                    />
                    <FormControl>
                      <Input
                        {...field}
                        value={numAdults}
                        type="number"
                        className="w-20 h-10 text-center"
                        readOnly
                      />
                    </FormControl>
                    <Plus
                      className="bg-primary/30 p-1 text-primary"
                      onClick={() => {
                        setNumAdults((adult) => adult + 1);
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
                        setNumMinors((minor) => {
                          if (minor === 0) return 0;
                          return minor - 1;
                        });
                      }}
                    />
                    <FormControl>
                      <Input
                        {...field}
                        value={numMinors}
                        type="text"
                        className="w-20 h-10 text-center"
                        readOnly
                      />
                    </FormControl>
                    <Plus
                      className="bg-primary/30 p-1 text-primary"
                      onClick={() => {
                        setNumMinors((minor) => minor + 1);
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />
          </PopoverContent>
        </Popover>

        <Button>Search</Button>
      </form>
    </Form>
  );
}

export default DesktopFlightForm;
