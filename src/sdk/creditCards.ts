import type { Fetch } from "../types/fetch";
import type { components } from "../types/openapi.generated";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam } from "../utils/validation";

export type CreditCardInquiryStatementSummary = components["schemas"]["CreditCardInquiryStatementSummary"];
export type CreditCardInquiryStatements = components["schemas"]["CreditCardInquiryStatements"];
export type CreditCardInquiryUnbilled = components["schemas"]["CreditCardInquiryUnbilled"];
export type CreditCardInquiryBalances = components["schemas"]["CreditCardInquiryBalances"];
export type CreditCardInquiryCards = components["schemas"]["CreditCardInquiryCards"];
export type CreditCardPromos = components["schemas"]["CreditCardPromos"];

// 1. Retrieve Credit Card Statement Summary
export async function getCreditCardStatementSummary({
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
}): Promise<CreditCardInquiryStatementSummary> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  const res = await fetchImpl(`${baseUrl}/credit/v1/cards/statements/summary`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as CreditCardInquiryStatementSummary;
}

// 2. Retrieve Credit Card Statement Transactions
export async function getCreditCardStatements({
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
}): Promise<CreditCardInquiryStatements> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  const res = await fetchImpl(`${baseUrl}/credit/v1/cards/statements`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as CreditCardInquiryStatements;
}

// 3. Retrieve Unbilled Transactions
export async function getCreditCardUnbilled({
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
}): Promise<CreditCardInquiryUnbilled> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  const res = await fetchImpl(`${baseUrl}/credit/v1/cards/unbilled`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as CreditCardInquiryUnbilled;
}

// 4. Retrieve Available Balance
export async function getCreditCardBalances({
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
}): Promise<CreditCardInquiryBalances> {
  const res = await fetchImpl(`${baseUrl}/credit/v1/cards/balances`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as CreditCardInquiryBalances;
}

// 5. Retrieve Availed Cards
export async function getCreditCardCards({
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
}): Promise<CreditCardInquiryCards> {
  const res = await fetchImpl(`${baseUrl}/credit/v1/cards`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as CreditCardInquiryCards;
}

// 6. Retrieve Credit Card Promos
export async function getCreditCardPromos({
  clientId,
  clientSecret,
  partnerId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  partnerId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<CreditCardPromos> {
  const res = await fetchImpl(`${baseUrl}/credit/v1/cards/promos`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      "x-partner-id": partnerId,
    },
  });
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as CreditCardPromos;
} 