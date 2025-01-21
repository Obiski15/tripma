"use client";

import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { forwardRef, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useCreatePaymentIntent } from "@/services/payment/useCreatePaymentIntent";

import { Skeleton } from "@/components/ui/skeleton";
import Card from "./Card";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

const CardElement = forwardRef<HTMLButtonElement | null>((_, ref) => {
  const { createIntent, error, isPending } = useCreatePaymentIntent();
  const [clientSecret, setClientSecret] = useState("");

  const options = {
    clientSecret,
  };

  useEffect(() => {
    createIntent(300, {
      onSuccess: (result) => {
        setClientSecret(result.data.clientSecret);
      },
    });
  }, [createIntent]);

  if (isPending || !clientSecret)
    return (
      <div className="w-full flex flex-col gap-3 justify-start items-start">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />

        <div className="w-full flex justify-between items-center gap-2">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="flex-1 h-10" />
        </div>
      </div>
    );

  if (error) return <p>Unable to process your request. Pls try again</p>;

  return (
    <Elements stripe={stripePromise} options={options}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <Card ref={ref} stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    </Elements>
  );
});

CardElement.displayName = "CardElement";

export default CardElement;
