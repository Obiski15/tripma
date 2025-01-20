const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/payment`;

export async function createPaymentIntent(amount: number): Promise<{
  data: { clientSecret: string };
}> {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
    }),
  });

  const result = await res.json();

  return result;
}
