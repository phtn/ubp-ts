import type { Fetch } from "../types/fetch";
import type { components } from "../types/openapi.generated";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam } from "../utils/validation";

// Types
export type BillsPaymentRequest = components["schemas"]["BillsPaymentRequest"];
export type BillsPaymentResponse =
  components["schemas"]["BillsPaymentResponse"];
export type BillsPaymentStatus = components["schemas"]["BillsPaymentStatus"];

// 1. Pay Bills as Partner
export async function payBillsAsPartner({
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
  body: BillsPaymentRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<BillsPaymentResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/partners/v3/payments/single`, {
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
  return (await res.json()) as BillsPaymentResponse;
}

// 2. Get Partner Bills Payment Status
export async function getPartnerBillsPaymentStatus({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  senderRefId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  senderRefId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<BillsPaymentStatus> {
  const res = await fetchImpl(
    `${baseUrl}/partners/v3/payments/single/${senderRefId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-id": clientId,
        "x-ibm-client-secret": clientSecret,
        authorization: `Bearer ${accessToken}`,
        "x-partner-id": partnerId,
      },
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as BillsPaymentStatus;
}

// 3. Pay Bills as Customer
export async function payBillsAsCustomer({
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
  body: BillsPaymentRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<BillsPaymentResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/customers/v3/payments/single`, {
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
  return (await res.json()) as BillsPaymentResponse;
}

// 4. Get Customer Bills Payment Status
export async function getCustomerBillsPaymentStatus({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  senderRefId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  senderRefId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<BillsPaymentStatus> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(senderRefId, "senderRefId");
  const res = await fetchImpl(
    `${baseUrl}/customers/v3/payments/single/${senderRefId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-id": clientId,
        "x-ibm-client-secret": clientSecret,
        authorization: `Bearer ${accessToken}`,
        "x-partner-id": partnerId,
      },
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as BillsPaymentStatus;
}
