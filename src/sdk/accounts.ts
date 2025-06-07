import type {
  AccountBalances,
  AccountHistoryResponse,
  AccountInformationResponse,
  OnlineAccountInformation,
  OnlineAccountInformationResponse,
  SandboxRequest,
  SandboxResponse,
} from "@/types/accounts";
import type { Fetch } from "../types/fetch";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam } from "../utils/validation";

// 1. Get Account Details
export async function getAccountInfo({
  clientId,
  clientSecret,
  accessToken,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<AccountInformationResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  const res = await fetchImpl(`${baseUrl}/accounts/v1/info`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) await throwUBPError(res);
  return (await res.json()) as AccountInformationResponse;
}

// 2. Get Customer Bank Account Details
export async function getCustomerAccountInfo({
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
  body: OnlineAccountInformation;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<OnlineAccountInformationResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/customers/v1/accounts/info`, {
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
  if (!res.ok) await throwUBPError(res);
  return (await res.json()) as OnlineAccountInformationResponse;
}

// 3. Create Sandbox Bank Account
export async function createSandboxAccount({
  clientId,
  clientSecret,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
  params,
}: {
  clientId: string;
  clientSecret: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
  params: SandboxRequest;
}): Promise<SandboxResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(params, "params");
  const res = await fetchImpl(`${baseUrl}/sandbox/v1/accounts`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
    },
    body: JSON.stringify(params),
  });
  if (!res.ok) await throwUBPError(res);
  return (await res.json()) as SandboxResponse;
}

// 4. Retrieve Account Balance
export async function getAccountBalance({
  clientId,
  clientSecret,
  accountNumber,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accountNumber: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<AccountBalances> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  // requireParam(accountNumber, "accountNumber");
  const res = await fetchImpl(
    `${baseUrl}/accounts/v2/balances/${accountNumber}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-id": clientId,
        "x-ibm-client-secret": clientSecret,
      },
    },
  );
  if (!res.ok) await throwUBPError(res);
  return (await res.json()) as AccountBalances;
}

// 5. Retrieve Account Transaction History (Partner)
export async function getPartnerAccountTransactionHistory({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  query,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  query?: Record<string, string>;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<AccountHistoryResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  const url = new URL(`${baseUrl}/portal/accounts/v1/transactions`);
  if (query)
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v));
  const res = await fetchImpl(url.toString(), {
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
  if (!res.ok) await throwUBPError(res);
  return (await res.json()) as AccountHistoryResponse;
}

// 6. Retrieve Account Transaction History (Customer)
export async function getCustomerAccountTransactionHistory({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  query,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  query?: Record<string, string>;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<AccountHistoryResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  const url = new URL(`${baseUrl}/portal/online/accounts/v1/transactions`);
  if (query)
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v));
  const res = await fetchImpl(url.toString(), {
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
  if (!res.ok) await throwUBPError(res);
  return (await res.json()) as AccountHistoryResponse;
}
