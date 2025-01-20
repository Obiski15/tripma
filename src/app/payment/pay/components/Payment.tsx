"use client";

import { Bitcoin, CreditCard } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

import { formatCurrency } from "@/lib/helpers";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CardElement from "./card/CardElement";
import CreateAccount from "./CreateAccount";

function Payment() {
  const confirmPaymentRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full flex flex-col justify-between items-start gap-6 min-[880px]:flex-row min-[880px]:gap-20">
      <section className="w-full flex flex-col justify-start items-start gap-10 min-[880px]:w-[60%]">
        <Tabs defaultValue="card" className="flex flex-col gap-3">
          <TabsList>
            <TabsTrigger
              value="card"
              className="flex justify-start items-center gap-1"
            >
              <CreditCard width={18} height={18} /> <span>Credit card</span>
            </TabsTrigger>

            <TabsTrigger
              value="google pay"
              className="flex justify-start items-center gap-1"
              disabled
            >
              <Image
                alt="google"
                src="/icons/google.svg"
                width={18}
                height={18}
              />
              <span>Google pay</span>
            </TabsTrigger>
            <TabsTrigger
              value="apple pay"
              className="flex justify-start items-center gap-1"
              disabled
            >
              <Image
                alt="apple"
                src="/icons/apple.svg"
                width={18}
                height={18}
              />
              <span>Apple pay</span>
            </TabsTrigger>
            <TabsTrigger
              value="paypal"
              className="flex justify-start items-center gap-1"
              disabled
            >
              <Image
                alt="paypal"
                src="/icons/paypal.svg"
                width={18}
                height={18}
              />

              <span>Paypal</span>
            </TabsTrigger>
            <TabsTrigger
              value="crypto"
              className="flex justify-start items-center gap-1"
              disabled
            >
              <Bitcoin width={18} height={18} />
              <span>Crypto</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <CardElement ref={confirmPaymentRef} />
          </TabsContent>
        </Tabs>

        <CreateAccount />

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Cancellation Policy</h3>
          <p>
            This flight has a flexible cancellation policy. If you cancel or
            change your flight up to 30 days before the departure date, you are
            eligible for a free refund. All flights booked on Tripma are backed
            by our satisfaction guarantee, however cancellation policies vary by
            airline.{" "}
            <span className="text-primary cursor-pointer hover:underline">
              See the full cancellation policy for this flight.
            </span>
          </p>
        </div>

        <div className="flex justify-center items-start gap-3">
          <Button variant="outline">Back to seat select</Button>
          <Button
            onClick={() => {
              confirmPaymentRef.current?.click();
            }}
          >
            Confirm and pay
          </Button>
        </div>
      </section>

      <section className="w-full flex flex-col justify-start items-start gap-3 min-[880px]:w-[40%]">
        <div className="w-full border-border border rounded-lg p-4">
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

            <div className="flex-1 flex flex-col justify-start items-end gap-1 text-right">
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

            <div className="flex-1 flex flex-col justify-start items-end gap-1 text-right">
              <p>16h 45m (+1d)</p>
              <p>7:00 AM - 4:15 PM</p>
              <p>2h 45m in HNL</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end items-start">
          <div className="w-[60%] flex justify-between items-start p-2 text-[#27273F] text-base font-semibold">
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

        <div className="py-3 self-end">
          <Button
            onClick={() => {
              confirmPaymentRef.current?.click();
            }}
          >
            Confirm and pay
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Payment;
