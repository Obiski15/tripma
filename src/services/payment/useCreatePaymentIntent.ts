import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "./paymentApi";

export function useCreatePaymentIntent() {
  const {
    mutate: createIntent,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ["paymentIntent"],
    mutationFn: createPaymentIntent,
  });

  return { createIntent, error, isPending, data };
}
