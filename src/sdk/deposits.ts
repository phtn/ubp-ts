import type { Fetch } from "../types/fetch";
import type { components } from "../types/openapi.generated";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam, requireType } from "../utils/validation";

export type DepositRequest = components["schemas"]["DepositRequest"];
export type DepositResponse = components["schemas"]["DepositResponse"];
export type DepositError = components["schemas"]["DepositError"];

// 1. Replenish Sandbox Bank Account Balance
export async function replenishSandboxAccount({
  clientId,
  clientSecret,
  accessToken,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  body: DepositRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<DepositResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/sandbox/v1/accounts/deposit`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as DepositResponse;
}

// 2. Update Sandbox Bank Account Balance
export async function updateSandboxAccount({
  clientId,
  clientSecret,
  accessToken,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  body: DepositRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<DepositResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/partners/sb/sandbox/v1/accounts`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as DepositResponse;
} 