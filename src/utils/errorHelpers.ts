import { UBPError } from "./UBPError";

function extractErrorCode(body: unknown): string | undefined {
  if (typeof body === "object" && body !== null) {
    if ("code" in body && typeof (body as { code?: unknown }).code === "string") {
      return (body as { code: string }).code;
    }
    if ("error" in body && typeof (body as { error?: unknown }).error === "string") {
      return (body as { error: string }).error;
    }
    if (
      "errors" in body &&
      Array.isArray((body as { errors?: unknown }).errors) &&
      (body as { errors: unknown[] }).errors?.length &&
      typeof (body as { errors: { code?: unknown }[] }).errors?.[0]?.code === "string"
    ) {
      return (body as { errors: { code: string }[] }).errors?.[0]?.code;
    }
  }
  return undefined;
}

function extractErrorMessage(body: unknown, statusText: string): string {
  if (typeof body === "object" && body !== null) {
    if ("message" in body && typeof (body as { message?: unknown }).message === "string") {
      return (body as { message: string }).message;
    }
    if ("error" in body && typeof (body as { error?: unknown }).error === "string") {
      return (body as { error: string }).error;
    }
    if (
      "errors" in body &&
      Array.isArray((body as { errors?: unknown }).errors) &&
      (body as { errors: unknown[] }).errors?.length
    ) {
      const msg = (body as { errors: { message?: unknown }[] }).errors?.[0]?.message;
      if (typeof msg === "string") return msg;
    }
  }
  return statusText;
}

export async function parseApiError(res: Response): Promise<{ status: number; code?: string; message: string; responseBody?: unknown }> {
  let body: unknown = undefined;
  try {
    body = await res.json();
  } catch {
    // ignore
  }
  const code = extractErrorCode(body);
  const message = extractErrorMessage(body, res.statusText);
  return {
    status: res.status,
    code,
    message,
    responseBody: body,
  };
}

export async function throwUBPError(res: Response): Promise<never> {
  const err = await parseApiError(res);
  throw new UBPError(err);
} 