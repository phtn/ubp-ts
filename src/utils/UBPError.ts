export class UBPError extends Error {
  status?: number;
  code?: string;
  responseBody?: unknown;

  constructor({ message, status, code, responseBody }: { message: string; status?: number; code?: string; responseBody?: unknown }) {
    super(message);
    this.name = "UBPError";
    this.status = status;
    this.code = code;
    this.responseBody = responseBody;
  }
} 