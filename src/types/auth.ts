export interface AccessTokenResponse {
  token_type: "bearer";
  access_token: string;
  expires_in: number;
  scope?: string;
  refresh_token?: string;
}

export interface PartnerAuthParams {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  scope?: string;
  fetchImpl?: typeof fetch;
  baseUrl?: string;
}

export interface CustomerAuthParams {
  clientId: string;
  code: string;
  redirectUri: string;
  fetchImpl?: typeof fetch;
  baseUrl?: string;
} 