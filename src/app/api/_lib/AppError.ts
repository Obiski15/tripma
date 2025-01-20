export class AppError extends Error {
  public isOperation: boolean;
  public statusCode: number;
  public status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.isOperation = true;
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "Fail" : "Error";

    Error.captureStackTrace(this, this.constructor);
  }
}
