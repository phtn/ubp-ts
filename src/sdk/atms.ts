import { requireParam } from "../utils/validation";

export interface ATM {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type ATMsResponse = ATM[];

export type Fetch = typeof fetch;

export interface GetATMsParams {
  clientId: string;
  clientSecret: string;
  fetchImpl?: Fetch; // Optional, defaults to global fetch
  baseUrl?: string;  // Optional, defaults to UAT URL
}

export async function getATMs({
  clientId,
  clientSecret,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: GetATMsParams): Promise<ATMsResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  const res = await fetchImpl(`${baseUrl}/locators/v1/atms`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ATMs: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as ATMsResponse;
} 