"use client";

import { array, date, number, object, ObjectSchema, string } from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatCurrency } from "@/lib/helpers";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IEmergencyContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

interface IPassenger extends IEmergencyContact {
  suffix?: "Mr" | "Mrs" | "Miss" | "Sir";
  middleName?: string;
  dob: Date;
  redress?: number;
  travellerNumber: number;
}

interface IForm {
  passengers: IPassenger[];
  emergencyContact: IEmergencyContact;
}

function PassengerForm() {
  const emergencyContactSchema: ObjectSchema<IEmergencyContact> = object({
    email: string().trim().required("Email address is required"),
    firstName: string().required("Firstname is required"),
    lastName: string().required("Lastname is required"),
    phone: number().required("Tel number is required"),
  });

  const passengerSchema: ObjectSchema<IPassenger> =
    emergencyContactSchema.concat(
      object({
        suffix: string<"Mr" | "Mrs" | "Miss" | "Sir">().optional(),
        travellerNumber: number()
          .positive()
          .required("Traveller number is required"),
        dob: date().required("Passenger's dob is required"),
        redress: number().positive().optional(),
        middleName: string().optional(),
      })
    );

  const formSchema: ObjectSchema<IForm> = object({
    passengers: array()
      .of(passengerSchema)
      .required("passenger's Information is required to proceed"),
    emergencyContact: emergencyContactSchema,
  });

  const form = useForm<IForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      passengers: [{}],
      emergencyContact: {},
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  function onSubmit(data: IForm) {
    console.log(data);
  }

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
                  passenger 1 (Adult)
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.suffix`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder="Suffix" {...field} />
                        </FormControl>
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
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={{ after: new Date() }}
                                mode="single"
                              />
                            </PopoverContent>
                          </FormControl>
                        </FormItem>
                        <PopoverTrigger>
                          <Input
                            placeholder="Date of birth*"
                            value={format(
                              field.value ? field.value : new Date(),
                              "P"
                            )}
                            readOnly
                            className="cursor-pointer"
                          />
                          <p className="mt-1 text-xs text-left uppercase">
                            MM/DD/YYYY
                          </p>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.phone`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Phone number*"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

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
                            type="number"
                            placeholder="Known traveller number*"
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
              <div className="flex justify-between items-center gap-1">
                <input type="checkbox" />
                <p>same as Passenger</p>
              </div>

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
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="w-full min-[880px]:w-[45%]">
        <div className="border-border border-[1px] rounded-lg p-4">
          <div className="flex justify-start items-start gap-1 border-b-[1px] border-border py-2">
            <div className="relative w-10 h-10">
              <Image
                src="/images/airline.png"
                alt="eee"
                fill={true}
                className="rounded-full object-fit object-center"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <p>Hawaiian Airlines</p>
              <p>FIG4312</p>
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <p>16h 45m (+1d)</p>
              <p>7:00 AM - 4:15 PM</p>
              <p>2h 45m in HNL</p>
            </div>
          </div>

          <div className="flex justify-start items-start gap-1 py-2">
            <div className="relative w-10 h-10">
              <Image
                src="/images/airline.png"
                alt="eee"
                fill={true}
                className="rounded-full object-fit object-center"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <p>Hawaiian Airlines</p>
              <p>FIG4312</p>
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
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

        <div className="flex justify-end items-center py-10">
          <Button>Select Seats</Button>
        </div>

        <div className="flex justify-start items-center py-10 min-[880px]:justify-end">
          <div className="relative p-10 pb-20">
            <Image
              alt="luggage"
              src="/images/luggage.png"
              width={375}
              height={450}
            />

            <div className="absolute w-[237px] h-3 right-[-80px] top-[55%] rotate-90 flex justify-center items-center flex-col">
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
