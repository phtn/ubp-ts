import type { Fetch } from "../types/fetch";
import type { components } from "../types/openapi.generated";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam } from "../utils/validation";

// Types
export type TransferRequestv3 = components["schemas"]["TransferRequestv3"];
export type TransferResponsev3 = components["schemas"]["TransferResponsev3"];
export type TransferErrorv3 = components["schemas"]["TransferErrorv3"];
export type TransferError500v3 = components["schemas"]["TransferError500v3"];
export type InstapayRequest3 = components["schemas"]["InstapayRequest3"];
export type InstapayResponse3 = components["schemas"]["InstapayResponse3"];
export type OnlineInstapayRequest = components["schemas"]["OnlineInstapayRequest"];
export type OnlineInstapayResponse = components["schemas"]["OnlineInstapayResponse"];
export type OutwardRequest = components["schemas"]["OutwardRequest"];
export type OutwardResponse = components["schemas"]["OutwardResponse"];
export type OutwardError = components["schemas"]["OutwardError"];
export type OnlineInstapayError = components["schemas"]["OnlineInstapayError"];
export type EONWalletInstapayRequest = components["schemas"]["EONWalletInstapayRequest"];
export type EONWalletInstapayResponse = components["schemas"]["EONWalletInstapayResponse"];
export type SingleRequestV3 = components["schemas"]["SingleRequestv3"]; // TODO: type from openapi.generated
export type SingleResponseV3 = components["schemas"]["SingleResponsev3"]; // TODO: type from openapi.generated
export type RetrieveResponsev3 = components["schemas"]["RetrieveResponsev3"];

// 1. UnionBank-to-UnionBank (Intrabank) Transfer
export async function transferIntrabank({
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
  body: TransferRequestv3;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<TransferResponsev3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(`${baseUrl}/partners/v3/transfers/single`, {
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
  return (await res.json()) as TransferResponsev3;
}

// 1b. Intrabank Transfer Status
export async function getIntrabankTransferStatus({
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
}): Promise<TransferResponsev3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(senderRefId, "senderRefId");

  const res = await fetchImpl(
    `${baseUrl}/partners/v3/transfers/single/${senderRefId}`,
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
  return (await res.json()) as TransferResponsev3;
}

// 2. Partner PESONet Transfer
export async function transferPesonetPartner({
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
  body: SingleRequestV3;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(
    `${baseUrl}/partners/v3/pesonet/transfers/single`,
    {
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
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as SingleResponseV3;
}

// 2b. Partner PESONet Transfer Status
export async function getPesonetPartnerTransferStatus({
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
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(senderRefId, "senderRefId");

  const res = await fetchImpl(
    `${baseUrl}/partners/v3/pesonet/transfers/single/${senderRefId}`,
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
  return (await res.json()) as SingleResponseV3;
}

// 3. Partner InstaPay Transfer
export async function transferInstapayPartner({
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
  body: SingleRequestV3;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(
    `${baseUrl}/partners/v3/instapay/transfers/single`,
    {
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
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as SingleResponseV3;
}

// 3b. Partner InstaPay Transfer Status
export async function getInstapayPartnerTransferStatus({
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
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(senderRefId, "senderRefId");

  const res = await fetchImpl(
    `${baseUrl}/partners/v3/instapay/transfers/single/${senderRefId}`,
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
  return (await res.json()) as SingleResponseV3;
}

// 4. Customer PESONet Transfer
export async function transferPesonetCustomer({
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
  body: OutwardRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<OutwardResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(`${baseUrl}/online/v2/pesonet/transfers/single`, {
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
  return (await res.json()) as OutwardResponse;
}

// 4b. Customer PESONet Transfer Status
export async function getPesonetCustomerTransferStatus({
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
}): Promise<OutwardResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(senderRefId, "senderRefId");

  const res = await fetchImpl(
    `${baseUrl}/online/v2/pesonet/transfers/single/${senderRefId}`,
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
  return (await res.json()) as OutwardResponse;
}

// 5. Customer InstaPay Transfer
export async function transferInstapayCustomer({
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
  body: SingleRequestV3;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(
    `${baseUrl}/online/v2/instapay/transfers/single`,
    {
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
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as SingleResponseV3;
}

// 5b. Customer InstaPay Transfer Status
export async function getInstapayCustomerTransferStatus({
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
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(senderRefId, "senderRefId");

  const res = await fetchImpl(
    `${baseUrl}/online/v2/instapay/transfers/single/${senderRefId}`,
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
  return (await res.json()) as SingleResponseV3;
}

// 6. EON Wallet PESONet Transfer
export async function transferPesonetEON({
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
  body: EONWalletInstapayRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<EONWalletInstapayResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v1/pesonet/transfers`,
    {
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
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as EONWalletInstapayResponse;
}

// 7. EON Wallet InstaPay Transfer
export async function transferInstapayEON({
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
  body: EONWalletInstapayRequest;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<EONWalletInstapayResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");

  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v3/instapay/transfers`,
    {
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
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as EONWalletInstapayResponse;
}

// 8. Bank List Endpoints
export async function getInstapayBanks({
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
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");

  const res = await fetchImpl(`${baseUrl}/partners/v3/instapay/banks`, {
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
  return (await res.json()) as SingleResponseV3;
}

export async function getPesonetBanks({
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
}): Promise<SingleResponseV3> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");

  const res = await fetchImpl(`${baseUrl}/partners/v3/pesonet/banks`, {
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
  return (await res.json()) as SingleResponseV3;
}
