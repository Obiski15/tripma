import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "./errorHandler";

export function catchAsync(
  cb: (
    request: NextRequest
    // segmentData?: {
    //   params?: string;
    // }
  ) => Promise<NextResponse>
) {
  return async (
    request: NextRequest
    // segmentData?: {
    //   params?: string;
    // }
  ) => {
    try {
      return await cb(request);
    } catch (error) {
      errorHandler(error as Error);
    }
  };
}
