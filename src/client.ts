import type { Fetch } from "./types/fetch";
import type { ATMsResponse } from "./types/atms";
import type {
  PaymentRequestV5,
  PaymentResponseV5,
  // PayBillsViaPartnerRequest,
  // PayBillsViaPartnerResponse,
  PaymayaRequest,
  PaymayaResponse,
  CoinsPHRequest,
  CoinsPHResponse,
} from "./types/payments";
import {
  getAccountInfo,
  getCustomerAccountInfo,
  createSandboxAccount,
  getAccountBalance,
  getPartnerAccountTransactionHistory,
  getCustomerAccountTransactionHistory,
  type AccountInformationResponse,
  type OnlineAccountInformation,
  type OnlineAccountInformationResponse,
  type SandboxRequest,
  type SandboxResponse,
  type AccountBalances,
  type AccountHistoryResponse,
} from "./sdk/accounts";
import {
  transferIntrabank,
  getIntrabankTransferStatus,
  transferPesonetPartner,
  getPesonetPartnerTransferStatus,
  transferInstapayPartner,
  getInstapayPartnerTransferStatus,
  transferPesonetCustomer,
  getPesonetCustomerTransferStatus,
  transferInstapayCustomer,
  getInstapayCustomerTransferStatus,
  transferPesonetEON,
  transferInstapayEON,
  getInstapayBanks,
  getPesonetBanks,
  type TransferRequestv3,
  type TransferResponsev3,
  type OutwardRequest,
  type OutwardResponse,
  type OnlineInstapayRequest,
  type OnlineInstapayResponse,
  type EONWalletInstapayRequest,
  type EONWalletInstapayResponse,
  type SingleRequestV3,
  type SingleResponseV3,
  type RetrieveResponsev3,
} from "./sdk/transfers";
import {
  payBillsAsPartner,
  getPartnerBillsPaymentStatus,
  payBillsAsCustomer,
  getCustomerBillsPaymentStatus,
  type BillsPaymentStatus,
  type BillsPaymentResponse,
} from "./sdk/bills";
import {
  replenishSandboxAccount,
  updateSandboxAccount,
  type DepositResponse,
} from "./sdk/deposits";
import {
  getCreditCardStatementSummary,
  getCreditCardStatements,
  getCreditCardUnbilled,
  getCreditCardBalances,
  getCreditCardCards,
  getCreditCardPromos,
  type CreditCardInquiryStatementSummary,
  type CreditCardInquiryStatements,
  type CreditCardInquiryUnbilled,
  type CreditCardInquiryBalances,
  type CreditCardInquiryCards,
  type CreditCardPromos,
} from "./sdk/creditCards";

export interface UBPClientConfig {
  clientId: string;
  clientSecret: string;
  baseUrl?: string;
  fetchImpl?: Fetch;
  /** Optional hook called before each request */
  onRequest?: (req: {
    url: string;
    options: RequestInit;
    endpoint: string;
  }) => void | Promise<void>;
  /** Optional hook called after each response */
  onResponse?: (res: {
    url: string;
    options: RequestInit;
    endpoint: string;
    response: Response;
  }) => void | Promise<void>;
}

export class UBPClient {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private fetchImpl: Fetch;
  private onRequest?: UBPClientConfig["onRequest"];
  private onResponse?: UBPClientConfig["onResponse"];

  constructor({
    clientId,
    clientSecret,
    baseUrl = "https://api-uat.unionbankph.com/partners/sb",
    fetchImpl = fetch,
    onRequest,
    onResponse,
  }: UBPClientConfig) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl;
    this.fetchImpl = fetchImpl;
    this.onRequest = onRequest;
    this.onResponse = onResponse;
  }

  // --- Internal helper for hooks ---
  private async _fetchWithHooks(
    url: string,
    options: RequestInit,
    endpoint: string,
  ): Promise<Response> {
    if (this.onRequest) await this.onRequest({ url, options, endpoint });
    const res = await this.fetchImpl(url, options);
    if (this.onResponse)
      await this.onResponse({ url, options, endpoint, response: res });
    return res;
  }

  async getATMs(): Promise<ATMsResponse> {
    const res = await this._fetchWithHooks(
      `${this.baseUrl}/locators/v1/atms`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-ibm-client-id": this.clientId,
          "x-ibm-client-secret": this.clientSecret,
        },
      },
      "getATMs",
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch ATMs: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as ATMsResponse;
  }

  async makePayment({
    payment,
    accessToken,
    partnerId,
  }: {
    payment: PaymentRequestV5;
    accessToken: string;
    partnerId: string;
  }): Promise<PaymentResponseV5> {
    const res = await this._fetchWithHooks(
      `${this.baseUrl}/merchants/v5/payments/single`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-ibm-client-id": this.clientId,
          "x-ibm-client-secret": this.clientSecret,
          authorization: `Bearer ${accessToken}`,
          "x-partner-id": partnerId,
        },
        body: JSON.stringify(payment),
      },
      "makePayment",
    );
    if (!res.ok) {
      throw new Error(
        `Failed to make payment: ${res.status} ${res.statusText}`,
      );
    }
    return (await res.json()) as PaymentResponseV5;
  }

  async payBillsAsPartner(
    params: Omit<
      Parameters<typeof payBillsAsPartner>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<BillsPaymentResponse> {
    return payBillsAsPartner({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getPartnerBillsPaymentStatus(
    params: Omit<
      Parameters<typeof getPartnerBillsPaymentStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<BillsPaymentStatus> {
    return getPartnerBillsPaymentStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async payBillsAsCustomer(
    params: Omit<
      Parameters<typeof payBillsAsCustomer>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<BillsPaymentResponse> {
    return payBillsAsCustomer({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCustomerBillsPaymentStatus(
    params: Omit<
      Parameters<typeof getCustomerBillsPaymentStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<BillsPaymentStatus> {
    return getCustomerBillsPaymentStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async paymayaTopUp({
    payment,
    accessToken,
    partnerId,
  }: {
    payment: PaymayaRequest;
    accessToken: string;
    partnerId: string;
  }): Promise<PaymayaResponse> {
    const res = await this._fetchWithHooks(
      `${this.baseUrl}/paymaya/v2/topup`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-ibm-client-id": this.clientId,
          "x-ibm-client-secret": this.clientSecret,
          authorization: `Bearer ${accessToken}`,
          "x-partner-id": partnerId,
        },
        body: JSON.stringify(payment),
      },
      "paymayaTopUp",
    );
    if (!res.ok) {
      throw new Error(
        `Failed to top up Paymaya: ${res.status} ${res.statusText}`,
      );
    }
    return (await res.json()) as PaymayaResponse;
  }

  async coinsPHTopUp({
    payment,
    accessToken,
    partnerId,
  }: {
    payment: CoinsPHRequest;
    accessToken: string;
    partnerId: string;
  }): Promise<CoinsPHResponse> {
    const res = await this._fetchWithHooks(
      `${this.baseUrl}/coinsph/v2/topup`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-ibm-client-id": this.clientId,
          "x-ibm-client-secret": this.clientSecret,
          authorization: `Bearer ${accessToken}`,
          "x-partner-id": partnerId,
        },
        body: JSON.stringify(payment),
      },
      "coinsPHTopUp",
    );
    if (!res.ok) {
      throw new Error(
        `Failed to top up Coins.ph: ${res.status} ${res.statusText}`,
      );
    }
    return (await res.json()) as CoinsPHResponse;
  }

  async getAccountInfo({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<AccountInformationResponse> {
    return getAccountInfo({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessToken,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCustomerAccountInfo({
    accessToken,
    partnerId,
    body,
  }: {
    accessToken: string;
    partnerId: string;
    body: OnlineAccountInformation;
  }): Promise<OnlineAccountInformationResponse> {
    return getCustomerAccountInfo({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessToken,
      partnerId,
      body,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async createSandboxAccount({
    body,
  }: {
    body: SandboxRequest;
  }): Promise<SandboxResponse> {
    return createSandboxAccount({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      body,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getAccountBalance({
    accountNumber,
  }: {
    accountNumber: string;
  }): Promise<AccountBalances> {
    return getAccountBalance({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accountNumber,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getPartnerAccountTransactionHistory({
    accessToken,
    partnerId,
    query,
  }: {
    accessToken: string;
    partnerId: string;
    query?: Record<string, string>;
  }): Promise<AccountHistoryResponse> {
    return getPartnerAccountTransactionHistory({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessToken,
      partnerId,
      query,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCustomerAccountTransactionHistory({
    accessToken,
    partnerId,
    query,
  }: {
    accessToken: string;
    partnerId: string;
    query?: Record<string, string>;
  }): Promise<AccountHistoryResponse> {
    return getCustomerAccountTransactionHistory({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessToken,
      partnerId,
      query,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  // --- Transfers ---
  async transferIntrabank(
    params: Omit<
      Parameters<typeof transferIntrabank>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: TransferRequestv3 },
  ): Promise<TransferResponsev3> {
    return transferIntrabank({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getIntrabankTransferStatus(
    params: Omit<
      Parameters<typeof getIntrabankTransferStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<TransferResponsev3> {
    return getIntrabankTransferStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async transferPesonetPartner(
    params: Omit<
      Parameters<typeof transferPesonetPartner>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: SingleRequestV3 },
  ): Promise<SingleResponseV3> {
    return transferPesonetPartner({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getPesonetPartnerTransferStatus(
    params: Omit<
      Parameters<typeof getPesonetPartnerTransferStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<SingleResponseV3> {
    return getPesonetPartnerTransferStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async transferInstapayPartner(
    params: Omit<
      Parameters<typeof transferInstapayPartner>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: SingleRequestV3 },
  ): Promise<SingleResponseV3> {
    return transferInstapayPartner({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getInstapayPartnerTransferStatus(
    params: Omit<
      Parameters<typeof getInstapayPartnerTransferStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<SingleResponseV3> {
    return getInstapayPartnerTransferStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async transferPesonetCustomer(
    params: Omit<
      Parameters<typeof transferPesonetCustomer>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: OutwardRequest },
  ): Promise<OutwardResponse> {
    return transferPesonetCustomer({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getPesonetCustomerTransferStatus(
    params: Omit<
      Parameters<typeof getPesonetCustomerTransferStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<OutwardResponse> {
    return getPesonetCustomerTransferStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async transferInstapayCustomer(
    params: Omit<
      Parameters<typeof transferInstapayCustomer>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: OnlineInstapayRequest },
  ): Promise<OnlineInstapayResponse> {
    return transferInstapayCustomer({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getInstapayCustomerTransferStatus(
    params: Omit<
      Parameters<typeof getInstapayCustomerTransferStatus>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<OnlineInstapayResponse> {
    return getInstapayCustomerTransferStatus({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async transferPesonetEON(
    params: Omit<
      Parameters<typeof transferPesonetEON>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: EONWalletInstapayRequest },
  ): Promise<EONWalletInstapayResponse> {
    return transferPesonetEON({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async transferInstapayEON(
    params: Omit<
      Parameters<typeof transferInstapayEON>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    > & { body: EONWalletInstapayRequest },
  ): Promise<EONWalletInstapayResponse> {
    return transferInstapayEON({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getInstapayBanks(
    params: Omit<
      Parameters<typeof getInstapayBanks>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<RetrieveResponsev3> {
    return getInstapayBanks({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    }) as RetrieveResponsev3;
  }

  async getPesonetBanks(
    params: Omit<
      Parameters<typeof getPesonetBanks>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<RetrieveResponsev3> {
    return getPesonetBanks({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    }) as RetrieveResponsev3;
  }

  async replenishSandboxAccount(
    params: Omit<
      Parameters<typeof replenishSandboxAccount>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<DepositResponse> {
    return replenishSandboxAccount({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async updateSandboxAccount(
    params: Omit<
      Parameters<typeof updateSandboxAccount>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<DepositResponse> {
    return updateSandboxAccount({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCreditCardStatementSummary(
    params: Omit<
      Parameters<typeof getCreditCardStatementSummary>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<CreditCardInquiryStatementSummary> {
    return getCreditCardStatementSummary({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCreditCardStatements(
    params: Omit<
      Parameters<typeof getCreditCardStatements>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<CreditCardInquiryStatements> {
    return getCreditCardStatements({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCreditCardUnbilled(
    params: Omit<
      Parameters<typeof getCreditCardUnbilled>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<CreditCardInquiryUnbilled> {
    return getCreditCardUnbilled({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCreditCardBalances(
    params: Omit<
      Parameters<typeof getCreditCardBalances>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<CreditCardInquiryBalances> {
    return getCreditCardBalances({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCreditCardCards(
    params: Omit<
      Parameters<typeof getCreditCardCards>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<CreditCardInquiryCards> {
    return getCreditCardCards({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }

  async getCreditCardPromos(
    params: Omit<
      Parameters<typeof getCreditCardPromos>[0],
      "clientId" | "clientSecret" | "fetchImpl" | "baseUrl"
    >,
  ): Promise<CreditCardPromos> {
    return getCreditCardPromos({
      ...params,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      fetchImpl: this.fetchImpl,
      baseUrl: this.baseUrl,
    });
  }
}
