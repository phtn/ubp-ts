import type { Fetch } from "../types/fetch";
import { requireParam } from "../utils/validation";

export interface ForexRate {
  currency: string;
  rate: string;
}

export type ForexRatesResponse = ForexRate[];

export async function getForexRates({
  clientId,
  clientSecret,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: {
  clientId: string;
  clientSecret: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<ForexRatesResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  const res = await fetchImpl(`${baseUrl}/forex/v1/rates`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch forex rates: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as ForexRatesResponse;
} 