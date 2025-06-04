export class UBPError extends Error {
  status?: number;
  code?: string;
  responseBody?: any;

  constructor({ message, status, code, responseBody }: { message: string; status?: number; code?: string; responseBody?: any }) {
    super(message);
    this.name = "UBPError";
    this.status = status;
    this.code = code;
    this.responseBody = responseBody;
  }
} 