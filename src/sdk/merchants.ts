import type { Fetch } from "../types/fetch";
import { requireParam } from "../utils/validation";

export async function makeMerchantPayment({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  body,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  body: any;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<any> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(body, "body");
  const res = await fetchImpl(`${baseUrl}/merchants/v5/payments/single`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
      "x-partner-id": partnerId,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to make merchant payment: ${res.status} ${res.statusText}`);
  return await res.json();
}

export async function getMerchantPaymentStatus({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  partnerRefId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  partnerRefId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<any> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(partnerRefId, "partnerRefId");
  const res = await fetchImpl(`${baseUrl}/merchants/v5/payments/single/${partnerRefId}`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
      "x-partner-id": partnerId,
    },
  });
  if (!res.ok) throw new Error(`Failed to get merchant payment status: ${res.status} ${res.statusText}`);
  return await res.json();
}

export async function getMerchantPaymentOTP({
  clientId,
  clientSecret,
  accessToken,
  partnerId,
  partnerRefId,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  partnerId: string;
  partnerRefId: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}): Promise<any> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(accessToken, "accessToken");
  requireParam(partnerId, "partnerId");
  requireParam(partnerRefId, "partnerRefId");
  const res = await fetchImpl(`${baseUrl}/merchants/v5/payments/otp/single`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-ibm-client-id": clientId,
      "x-ibm-client-secret": clientSecret,
      authorization: `Bearer ${accessToken}`,
      "x-partner-id": partnerId,
    },
  });
  if (!res.ok) throw new Error(`Failed to get merchant payment OTP: ${res.status} ${res.statusText}`);
  return await res.json();
} 