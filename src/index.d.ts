import type { ATM, ATMsResponse } from "./types/atms";
import type { AccessTokenResponse, PartnerAuthParams, CustomerAuthParams } from "./types/auth";

export declare function getATMs(params: {
  clientId: string;
  clientSecret: string;
  fetchImpl?: typeof fetch;
  baseUrl?: string;
}): Promise<ATMsResponse>;

export declare function authenticatePartner(params: PartnerAuthParams): Promise<AccessTokenResponse>;

export declare function authenticateCustomer(params: CustomerAuthParams): Promise<AccessTokenResponse>;

export type { ATM, ATMsResponse } from "./types/atms";
export type { AccessTokenResponse, PartnerAuthParams, CustomerAuthParams } from "./types/auth"; 