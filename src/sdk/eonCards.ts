import type { Fetch } from "../types/fetch";
import type { components } from "../types/openapi.generated";
import { throwUBPError } from "../utils/errorHelpers";
import { requireParam } from "../utils/validation";

export type VirtualCardResponse = components["schemas"]["VirtualCardResponse"];
export type ActivateVirtualCardResponse =
  components["schemas"]["ActivateVirtualCardResponse"];
export type EONWalletUnlockCardsResponse =
  components["schemas"]["EONWalletUnlockCardsResponse"];
export type ReplacementCardResponse =
  components["schemas"]["ReplacementCardResponse"];
export type LinkingPhysicalResponse =
  components["schemas"]["LinkingPhysicalResponse"];

// 1. Create Virtual Account with Linked Virtual Card
export async function createVirtualAccountWithCard({
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
  body: components["schemas"]["VirtualCardRequest"];
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<VirtualCardResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v1/cards/accounts/virtual`,
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
  return (await res.json()) as VirtualCardResponse;
}

// 2. Activate Virtual Card
export async function activateVirtualCard({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  cardToken,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  cardToken: string;
  body: components["schemas"]["ActivateVirtualCardRequest"];
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<ActivateVirtualCardResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(cardToken, "cardToken");
  requireParam(body, "body");
  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v2/cards/activation`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-id": clientId,
        "x-ibm-client-secret": clientSecret,
        authorization: `Bearer ${accessToken}`,
        "x-partner-id": partnerId,
        "card-token": cardToken,
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as ActivateVirtualCardResponse;
}

// 3. Unlock Card
export async function unlockCard({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  cardToken,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  cardToken: string;
  body: components["schemas"]["EONWalletUnlockCardsRequest"];
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<EONWalletUnlockCardsResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(cardToken, "cardToken");
  requireParam(body, "body");
  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v2/cards/unlock`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-id": clientId,
        "x-ibm-client-secret": clientSecret,
        authorization: `Bearer ${accessToken}`,
        "x-partner-id": partnerId,
        "card-token": cardToken,
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as EONWalletUnlockCardsResponse;
}

// 4. Replace Locked Card
export async function replaceLockedCard({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  cardToken,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  cardToken: string;
  body: components["schemas"]["ReplacementCardRequest"];
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<ReplacementCardResponse> {
  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v1/cards/replacements`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-id": clientId,
        "x-ibm-client-secret": clientSecret,
        authorization: `Bearer ${accessToken}`,
        "x-partner-id": partnerId,
        "card-token": cardToken,
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw await throwUBPError(res);
  return (await res.json()) as ReplacementCardResponse;
}

// 5. Link New Physical Card
export async function linkPhysicalCard({
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
  body: components["schemas"]["LinkingPhysicalRequest"];
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<LinkingPhysicalResponse> {
  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v1/cards/accounts/linking`,
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
  return (await res.json()) as LinkingPhysicalResponse;
}

// 6. Retrieve List of Cards Linked to Customer
export async function getCustomerCards({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  customerId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  customerId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<unknown> {
  const res = await fetchImpl(
    `${baseUrl}/partners/eon/wallet/v1/customers/${customerId}/cards`,
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
  return await res.json();
}
