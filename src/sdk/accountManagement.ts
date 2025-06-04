import type { Fetch } from "../types/fetch";
import type { components } from "../types/openapi.generated";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam, requireType } from "../utils/validation";

export type DAOSubmitRequest = components["schemas"]["DAOSubmitRequest"];
export type DAOSubmitResponse = components["schemas"]["DAOSubmitResponse"];
export type OverdraftAccountResponse = components["schemas"]["OverdraftAccountResponse"];
export type OverdraftAccountStatus = components["schemas"]["OverdraftAccountStatus"];
export type EONWalletAccountUpgradeRequest = components["schemas"]["EONWalletAccountUpgradeRequest"];
export type EONWalletAccountUpgradeResponse = components["schemas"]["EONWalletAccountUpgradeResponse"];

// 1. Submit Application to Create New Account
export async function submitAccountApplication({
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
  body: DAOSubmitRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<DAOSubmitResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/dao/v1/savings/accounts/applications/submit`, {
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
  return (await res.json()) as DAOSubmitResponse;
}

// 2. Create Overdraft Account
export async function createOverdraftAccount({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  body: any; // TODO: type from openapi.generated
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<OverdraftAccountResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/partners/v1/accounts/overdraft`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
      "x-partner-id": partnerId,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as OverdraftAccountResponse;
}

// 3. Get Overdraft Account Status
export async function getOverdraftAccountStatus({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<OverdraftAccountStatus> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  const res = await fetchImpl(`${baseUrl}/partners/sb/partners/v1/accounts/overdraft`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
      "x-partner-id": partnerId,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as OverdraftAccountStatus;
}

// 4. Upgrade EON Wallet Account
export async function upgradeEONWalletAccount({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  body: EONWalletAccountUpgradeRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<EONWalletAccountUpgradeResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/partners/eon/wallet/v1/accounts/upgrade`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
      "x-partner-id": partnerId,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as EONWalletAccountUpgradeResponse;
} 