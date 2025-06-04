import { requireParam, requireType } from "../utils/validation";

export interface AccessTokenResponse {
  token_type: "bearer";
  access_token: string;
  expires_in: number;
  scope?: string;
  refresh_token?: string;
}

export interface AccessTokenError {
  error: string;
}

export type Fetch = typeof fetch;

// Partner Authentication (Password Grant)
export interface PartnerAuthParams {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  scope?: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}

export async function authenticatePartner({
  clientId,
  clientSecret,
  username,
  password,
  scope = "",
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: PartnerAuthParams): Promise<AccessTokenResponse> {
  requireParam(clientId, "clientId");
  requireParam(clientSecret, "clientSecret");
  requireParam(username, "username");
  requireParam(password, "password");
  const body = new URLSearchParams({
    grant_type: "password",
    client_id: clientId,
    username,
    password,
    ...(scope ? { scope } : {}),
  });
  const res = await fetchImpl(`${baseUrl}/partners/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`Failed to authenticate partner: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as AccessTokenResponse;
}

// Customer Authentication (Authorization Code Grant)
export interface CustomerAuthParams {
  clientId: string;
  code: string;
  redirectUri: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}

export async function authenticateCustomer({
  clientId,
  code,
  redirectUri,
  fetchImpl = fetch,
  baseUrl = "https://api-uat.unionbankph.com/partners/sb"
}: CustomerAuthParams): Promise<AccessTokenResponse> {
  requireParam(clientId, "clientId");
  requireParam(code, "code");
  requireParam(redirectUri, "redirectUri");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
  });
  const res = await fetchImpl(`${baseUrl}/customers/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`Failed to authenticate customer: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as AccessTokenResponse;
} 