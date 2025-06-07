import { requireParam } from "@/utils/validation";
import type { AccessTokenResponse, PartnerAuthParams } from "./types";

export async function authenticatePartner({
  clientId,
  clientSecret,
  username,
  password,
  scope,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb",
}: PartnerAuthParams): Promise<AccessTokenResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(username, "username");
  requireParam(password, "password");
  const res = await fetchImpl(`${baseUrl}/partners/v1/oauth2/token`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=password&client_id=${clientId}&username=${username}&password=${password}&scope=${scope}`,
  });
  if (!res.ok) {
    const e = new Error(
      `Failed to authenticate partner: ${res.status} ${res.statusText}`,
    );
    console.error(e);
  }
  return (await res.json()) as AccessTokenResponse;
}
