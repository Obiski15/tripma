"use client";

import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { forwardRef, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useCreatePaymentIntent } from "@/services/payment/useCreatePaymentIntent";

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

  if (isPending || !clientSecret) return <p>pending</p>;

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
