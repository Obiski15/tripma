import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { catchAsync } from "../_lib/utils/catchAsync";
import { AppError } from "../_lib/AppError";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = catchAsync(async (request: NextRequest) => {
  const { amount }: { amount: number } = await request.json();

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount * 100,
    payment_method_types: ["card"],
  });

  return NextResponse.json(
    {
      status: "success",
      data: { clientSecret: paymentIntent.client_secret },
    },
    { status: 200 }
  );
});

export const GET = catchAsync(async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id") as string;

  if (!id) throw new AppError("transaction id param is required", 400);

  const payment = await stripe.paymentIntents.retrieve(id);

  return NextResponse.json({
    status: "success",
    data: {
      payment,
    },
  });
});
