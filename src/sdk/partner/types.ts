export interface AccessTokenResponse {
  token_type: "bearer";
  access_token: string;
  expires_in: number;
  scope?: string;
  refresh_token?: string;
}

export type Fetch = typeof fetch;
export type PartnerAuthScope =
  | "payments"
  | "transfers"
  | "transfers_pesonet"
  | "instapay"
  | "paymaya"
  | "coins"
  | "load_purchase"
  | "card_perks"
  | "otp"
  | "payments_loans"
  | "account_inquiry"
  | "eon_transfers"
  | "interblocks"
  | "link_account"
  | "oda_loans"
  | "account"
  | "giftaway"
  | "dragonpay"
  | "partner_inlife_insurance"
  | "prepaid_transfers"
  | "axinan";

export interface PartnerAuthParams {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  scope?: PartnerAuthScope;
  fetchImpl?: Fetch;
  baseUrl?: string;
}
