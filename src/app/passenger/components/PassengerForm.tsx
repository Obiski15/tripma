"use client";

import { array, date, number, object, ObjectSchema, string } from "yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatCurrency } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";
import Image from "next/image";

import { IEmergencyContact, IPassenger, IPassengerForm } from "../types";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { IFlightOffersData } from "@/services/types";
import {
  PASSENGER_INFORMATION_SESSION_KEY,
  SELECTED_FLIGHT_SESSION_KEY,
} from "@/lib/constants";

import { Calendar } from "@/components/ui/calendar";
// import { PHONE_CODES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

function PassengerForm() {
  const { value: selectedFlight } = useSessionStorage<IFlightOffersData | null>(
    SELECTED_FLIGHT_SESSION_KEY,
    null
  );
  const { value: passengerInormation, setValue: setPassengerInformation } =
    useSessionStorage<IPassengerForm | null>(
      PASSENGER_INFORMATION_SESSION_KEY,
      null
    );

  const router = useRouter();

  const emergencyContactSchema: ObjectSchema<IEmergencyContact> = object({
    email: string().trim().email().required("Email address is required"),
    phone: number().required("Telephone number is required"),
    firstName: string().required("Firstname is required"),
    lastName: string().required("Lastname is required"),
    // dialCode: string()
    // .trim()
    // .required("country code is required")
    // .max(4)
    // .min(2)
    // .matches(/^\+\d{1,4}$/, {
    //   message: "invalid dial code",
    // }),
  });

  const passengerSchema: ObjectSchema<IPassenger> =
    emergencyContactSchema.concat(
      object({
        suffix: string<
          | "Mr"
          | "Mrs"
          | "Miss"
          | "Ms"
          | "Sir"
          | "Hon"
          | "Fr"
          | "Rev"
          | "Pastor"
          | "Col"
          | "Lt"
          | "Eng"
          | "Prof"
          | "Dr"
        >().optional(),
        dob: date().required("Passenger's dob is required"),
        redress: number().positive().optional(),
        travellerNumber: string().optional(),
        middleName: string().optional(),
      })
    );

  const formSchema: ObjectSchema<IPassengerForm> = object({
    passengers: array()
      .of(passengerSchema)
      .required("passenger's Information is required to proceed"),
    emergencyContact: emergencyContactSchema,
  });

  const form = useForm<IPassengerForm>({
    resolver: yupResolver(formSchema),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  useEffect(() => {
    if (!selectedFlight) return router.push("/");

    if (
      !!selectedFlight?.itineraries?.length &&
      !!selectedFlight?.travelerPricings?.length
    ) {
      form.reset({
        emergencyContact: { ...passengerInormation?.emergencyContact },
        passengers: [
          ...selectedFlight?.travelerPricings?.map((_, index) => {
            return { ...passengerInormation?.passengers?.[index] };
          }),
        ],
      });
    }
  }, [selectedFlight, form, router, passengerInormation]);

  const onSubmit: SubmitHandler<IPassengerForm> = (data) => {
    setPassengerInformation(data);
    router.push("/preference");
  };

  return (
    <section className="flex flex-col justify-between items-start gap-10 px-3 py-3 md:px-10 min-[880px]:flex-row min-[880px]:gap-20">
      <div className="w-full flex flex-col justify-start items-start gap-6 min-[880px]:w-[55%]">
        <div className="flex flex-col justify-between items-start gap-4">
          <h3 className="text-primary font-bold text-xl min-[880px]:text-2xl">
            Passenger Information
          </h3>
          <p className="text-lg">
            Enter the required information for each traveler and be sure that it
            exactly matches the government-issued ID presented at the airport.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-8 justify-start items-start"
          >
            {fields.map((field, index) => (
              <div key={field.id} className="w-full flex flex-col gap-8">
                <p className="text-xl font-semild capitalize">
                  passenger {index + 1} (
                  {selectedFlight?.travelerPricings?.[index]?.travelerType})
                </p>

                <div className="flex gap-4 flex-wrap justify-start items-start">
                  <FormField
                    name={`passengers.${index}.firstName`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First name*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.passengers?.[index]?.firstName
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.middleName`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Middle Name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.lastName`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last Name*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.passengers?.[index]?.lastName
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.suffix`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Suffix" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="text-foreground">
                            {[
                              "Mr",
                              "Mrs",
                              "Miss",
                              "Ms",
                              "Sir",
                              "Hon",
                              "Fr",
                              "Rev",
                              "Pastor",
                              "Col",
                              "Lt",
                              "Eng",
                              "Prof",
                              "Dr",
                            ].map((title) => (
                              <SelectItem key={title} value={title}>
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.dob`}
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <FormItem>
                          <FormControl>
                            <PopoverContent className="bg-background text-foreground">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={{
                                  after:
                                    selectedFlight?.travelerPricings?.[
                                      index
                                    ]?.travelerType.toLowerCase() === "adult"
                                      ? new Date(
                                          new Date().setFullYear(
                                            new Date().getFullYear() - 12
                                          )
                                        )
                                      : new Date(),
                                }}
                              />
                            </PopoverContent>
                          </FormControl>
                        </FormItem>

                        <PopoverTrigger>
                          <p className="px-3 py-1 text-base border border-input shadow-sm rounded-md">
                            {field.value
                              ? format(field.value, "P")
                              : "Pick a date"}
                          </p>
                          <p className="mt-1 text-xs text-left uppercase">
                            MM/DD/YYYY
                          </p>
                          <FormMessage>
                            {
                              form.formState.errors.passengers?.[index]?.dob
                                ?.message
                            }
                          </FormMessage>
                        </PopoverTrigger>
                      </Popover>
                    )}
                  />
                </div>

                <div className="flex gap-4 flex-wrap justify-start items-start">
                  <FormField
                    name={`passengers.${index}.email`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email address*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.passengers?.[index]?.email
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-start items-center">
                    {/* <FormField
                      name={`passengers.${index}.dialCode`}
                      control={form.control}
                      render={() => (
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="+" />
                          </SelectTrigger>

                          <SelectContent className="text-foreground">
                            {PHONE_CODES.map((code) => (
                              <SelectItem
                                key={code.name}
                                value={code.dial_code}
                              >
                                {code.emoji}
                                {code.dial_code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    /> */}

                    <FormField
                      name={`passengers.${index}.phone`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Phone number*"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              form.formState.errors.passengers?.[index]?.phone
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    name={`passengers.${index}.redress`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Redress number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.travellerNumber`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Known traveller number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <div className="w-full flex flex-col justify-start items-start gap-6">
              <h3 className="text-lg font-semibold">
                Emergency Contact Information
              </h3>

              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full flex justify-between items-between gap-4">
                  <FormField
                    name="emergencyContact.firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First name*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.emergencyContact?.firstName
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="emergencyContact.lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last name*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.emergencyContact?.lastName
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full flex justify-between items-between gap-4">
                  <FormField
                    name="emergencyContact.email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email address*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.emergencyContact?.email
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="emergencyContact.phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Phone number*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form.formState.errors.emergencyContact?.phone
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-6">
              <h3 className="font-semibold">Bag Information</h3>
              <p>
                Each passenger is allowed one free carry-on bag and one personal
                item. First checked bag for each passenger is also free. Second
                bag check fees are waived for loyalty program members. See the{" "}
                <a className="text-primary hover:underline cursor-pointer">
                  full bag policy
                </a>
              </p>

              <div className="w-full flex flex-col justify-start items-start gap-3 sm:w-[70%]">
                <div className="w-full flex justify-between items-start">
                  <p className="flex-1">Passenger</p>
                  <p className="w-[50%] sm:w-[30%]">Checked bags</p>
                </div>

                <div className="w-full flex justify-between items-start">
                  <p className="flex-1">Obiski</p>
                  <div className="w-[50%] flex justify-between items-start sm:w-[30%]">
                    <Minus className="bg-primary/40 p-1 hover:bg-primary/30" />
                    <p>1</p>
                    <Plus className="bg-primary/40 p-1 hover:bg-primary/30" />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-10">
              <Button type="submit">Selct Seats</Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="w-full min-[880px]:w-[45%]">
        <div className="border-border border rounded-lg p-4">
          <div className="flex justify-start items-start gap-1 border-b-[1px] border-border py-2">
            <div className="relative w-10 h-10">
              <Image
                src="/images/airline.png"
                alt="airline"
                fill={true}
                className="rounded-full object-cover object-center"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <p>Hawaiian Airlines</p>
              <p>FIG4312</p>
            </div>

            <div className="flex-1 flex flex-col justify-start items-end gap-1">
              <p>16h 45m (+1d)</p>
              <p>7:00 AM - 4:15 PM</p>
              <p>2h 45m in HNL</p>
            </div>
          </div>

          <div className="flex justify-start items-start gap-1 py-2">
            <div className="relative w-10 h-10">
              <Image
                src="/images/airline.png"
                alt="airline"
                fill={true}
                className="rounded-full object-cover object-center"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <p>Hawaiian Airlines</p>
              <p>FIG4312</p>
            </div>

            <div className="flex-1 flex flex-col justify-start items-end gap-1">
              <p>16h 45m (+1d)</p>
              <p>7:00 AM - 4:15 PM</p>
              <p>2h 45m in HNL</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-start">
          <div className="w-[50%] flex justify-between items-start p-2 text-[#27273F] text-base font-semibold">
            <div className="w-[70%] flex flex-col justify-start items-start gap-1">
              <p className="w-full">Subtotal</p>
              <p className="w-full">Taxes and Fees</p>
              <p className="w-full">Total</p>
            </div>

            <div className="flex flex-col justify-start items-start gap-1">
              <p className="w-full">{formatCurrency(600)}</p>
              <p className="w-full">{formatCurrency(50)}</p>
              <p className="w-full">{formatCurrency(650)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center py-10 min-[880px]:justify-end">
          <div className="relative p-10 pb-20">
            <Image
              alt="luggage"
              src="/images/luggage.png"
              width={375}
              height={450}
            />

            <div className="absolute w-[237px] h-3 right-[-90px] top-[55%] rotate-90 flex justify-center items-center flex-col">
              <p className="bg-[#B0BED9] w-full h-[2px]"></p>
              <div className="bg-background font-medium p-3 absolute left-50% rotate-180">
                <p className="text-lg ">22&rsquo;&rsquo;</p>
                <p className="text-xs">56cm</p>
              </div>
              <p className="absolute right-full w-[2px] h-3 bg-[#B0BED9] rounded-sm"></p>
              <p className="absolute left-full w-[2px] h-3 bg-[#B0BED9] rounded-sm"></p>
            </div>

            <div className="absolute w-[247px] h-6 right-10 bottom-12 flex justify-between items-center gap-4">
              <div className="relative w-[60%] flex justify-center items-center flex-col">
                <p className="bg-[#B0BED9] w-full h-[2px]"></p>
                <div className="bg-background font-medium p-3 absolute left-50% ">
                  <p className="text-lg ">14&rsquo;&rsquo;</p>
                  <p className="text-xs">36cm</p>
                </div>
                <p className="absolute right-full w-[2px] h-3 bg-[#B0BED9] rounded-sm"></p>
                <p className="absolute left-full w-[2px] h-3 bg-[#B0BED9] rounded-sm"></p>
              </div>

              <div className="relative w-[40%] flex justify-center items-center flex-col">
                <p className="bg-[#B0BED9] w-full h-[2px]"></p>
                <div className="bg-background font-medium p-3 absolute left-50%">
                  <p className="text-lg ">9&rsquo;&rsquo;</p>
                  <p className="text-xs">23cm</p>
                </div>
                <p className="absolute right-full w-[2px] h-3 bg-[#B0BED9] rounded-sm"></p>
                <p className="absolute left-full w-[2px] h-3 bg-[#B0BED9] rounded-sm"></p>
              </div>
            </div>

            <p className="absolute bottom-0 right-10 text-xs">
              *Dimensions include handles and wheels
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PassengerForm;
