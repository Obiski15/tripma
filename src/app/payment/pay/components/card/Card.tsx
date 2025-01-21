"use client";

import { PaymentElement } from "@stripe/react-stripe-js";
import { StripeElements } from "@stripe/stripe-js/dist";
import { FormEvent, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { Stripe } from "@stripe/stripe-js";

import { toast } from "@/hooks/use-toast";

interface Properties {
  elements: StripeElements | null;
  stripe: Stripe | null;
}

const Card = forwardRef<HTMLButtonElement | null, Properties>(
  ({ stripe, elements }, ref) => {
    const router = useRouter();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!stripe || !elements) return;

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        toast({
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        router.push("/payment/confirm");
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button ref={ref}></button>
      </form>
    );
  }
);

Card.displayName = "Card";

export default Card;
