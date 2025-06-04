import { UBPError } from "./UBPError";

export async function parseApiError(res: Response): Promise<{ status: number; code?: string; message: string; responseBody?: any }> {
  let body: any = undefined;
  try {
    body = await res.json();
  } catch {
    // ignore
  }
  const code = body?.code || body?.error || body?.errors?.[0]?.code;
  const message = body?.message || body?.error || body?.errors?.[0]?.message || res.statusText;
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