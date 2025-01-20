import { NextResponse } from "next/server";

interface IError extends Error {
  isOperational?: boolean;
  statusCode?: number;
  status?: string;
}

function handleProductionError(err: IError) {
  if (err.isOperational) {
    return NextResponse.json(
      {
        status: err.status,
        message: err.message,
      },
      {
        status: err.statusCode,
      }
    );
  } else {
    return NextResponse.json(
      {
        status: "Error",
        message: "Something went wrong. pls try again",
      },
      {
        status: 500,
      }
    );
  }
}

function handleDevelopmentError(err: IError) {
  const statusCode = err.statusCode ?? 500;
  const status = err.status ?? "Error";

  return NextResponse.json(
    {
      status,
      name: err.name,
      stack: err.stack,
      message: err.message,
    },
    {
      status: statusCode,
    }
  );
}

export function errorHandler(err: IError) {
  if (process.env.NODE_ENV === "production") {
    const error: IError = { ...err, name: err.name, message: err.message };
    // check for other errors
    handleProductionError(error);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(err);
    handleDevelopmentError(err);
  }
}
