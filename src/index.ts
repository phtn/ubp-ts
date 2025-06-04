// 1. Get Account Details
async function getAccountInfo({ clientId, clientSecret, accessToken, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/accounts/v1/info`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`
        }
    });
    if (!res.ok) throw new Error(`Failed to get account info: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 2. Get Customer Bank Account Details
async function getCustomerAccountInfo({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/customers/v1/accounts/info`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to get customer account info: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 3. Create Sandbox Bank Account
async function createSandboxAccount({ clientId, clientSecret, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/sandbox/v1/accounts`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to create sandbox account: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 4. Retrieve Account Balance
async function getAccountBalance({ clientId, clientSecret, accountNumber, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accountNumber: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/accounts/v2/balances/${accountNumber}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret
        }
    });
    if (!res.ok) throw new Error(`Failed to get account balance: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 5. Retrieve Account Transaction History (Partner)
async function getPartnerAccountTransactionHistory({ clientId, clientSecret, accessToken, partnerId, query, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; query?: Record<string, string>; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const url = new URL(`${baseUrl}/portal/accounts/v1/transactions`);
    if (query) Object.entries(query).forEach(([k, v])=>url.searchParams.append(k, v));
    const res = await fetchImpl(url.toString(), {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get partner account transaction history: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 6. Retrieve Account Transaction History (Customer)
async function getCustomerAccountTransactionHistory({ clientId, clientSecret, accessToken, partnerId, query, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; query?: Record<string, string>; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const url = new URL(`${baseUrl}/portal/online/accounts/v1/transactions`);
    if (query) Object.entries(query).forEach(([k, v])=>url.searchParams.append(k, v));
    const res = await fetchImpl(url.toString(), {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get customer account transaction history: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 1. UnionBank-to-UnionBank (Intrabank) Transfer
async function transferIntrabank({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/transfers/single`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer intrabank: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 1b. Intrabank Transfer Status
async function getIntrabankTransferStatus({ clientId, clientSecret, accessToken, partnerId, senderRefId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; senderRefId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/transfers/single/${senderRefId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get intrabank transfer status: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 2. Partner PESONet Transfer
async function transferPesonetPartner({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/pesonet/transfers/single`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer via PESONet (partner): ${res.status} ${res.statusText}`);
    return await res.json();
}
// 2b. Partner PESONet Transfer Status
async function getPesonetPartnerTransferStatus({ clientId, clientSecret, accessToken, partnerId, senderRefId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; senderRefId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/pesonet/transfers/single/${senderRefId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get PESONet partner transfer status: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 3. Partner InstaPay Transfer
async function transferInstapayPartner({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/instapay/transfers/single`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer via InstaPay (partner): ${res.status} ${res.statusText}`);
    return await res.json();
}
// 3b. Partner InstaPay Transfer Status
async function getInstapayPartnerTransferStatus({ clientId, clientSecret, accessToken, partnerId, senderRefId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; senderRefId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/instapay/transfers/single/${senderRefId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get InstaPay partner transfer status: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 4. Customer PESONet Transfer
async function transferPesonetCustomer({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/online/v2/pesonet/transfers/single`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer via PESONet (customer): ${res.status} ${res.statusText}`);
    return await res.json();
}
// 4b. Customer PESONet Transfer Status
async function getPesonetCustomerTransferStatus({ clientId, clientSecret, accessToken, partnerId, senderRefId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; senderRefId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/online/v2/pesonet/transfers/single/${senderRefId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get PESONet customer transfer status: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 5. Customer InstaPay Transfer
async function transferInstapayCustomer({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/online/v2/instapay/transfers/single`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer via InstaPay (customer): ${res.status} ${res.statusText}`);
    return await res.json();
}
// 5b. Customer InstaPay Transfer Status
async function getInstapayCustomerTransferStatus({ clientId, clientSecret, accessToken, partnerId, senderRefId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; senderRefId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/online/v2/instapay/transfers/single/${senderRefId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get InstaPay customer transfer status: ${res.status} ${res.statusText}`);
    return await res.json();
}
// 6. EON Wallet PESONet Transfer
async function transferPesonetEON({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/eon/wallet/v1/pesonet/transfers`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer via PESONet (EON): ${res.status} ${res.statusText}`);
    return await res.json();
}
// 7. EON Wallet InstaPay Transfer
async function transferInstapayEON({ clientId, clientSecret, accessToken, partnerId, body, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; body: any; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/eon/wallet/v3/instapay/transfers`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to transfer via InstaPay (EON): ${res.status} ${res.statusText}`);
    return await res.json();
}
// 8. Bank List Endpoints
async function getInstapayBanks({ clientId, clientSecret, accessToken, partnerId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/instapay/banks`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get Instapay banks: ${res.status} ${res.statusText}`);
    return await res.json();
}
async function getPesonetBanks({ clientId, clientSecret, accessToken, partnerId, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; accessToken: string; partnerId: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/partners/v3/pesonet/banks`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret,
            authorization: `Bearer ${accessToken}`,
            "x-partner-id": partnerId
        }
    });
    if (!res.ok) throw new Error(`Failed to get Pesonet banks: ${res.status} ${res.statusText}`);
    return await res.json();
}
import { getBranches } from "./sdk/atms";
import { getForexRates } from "./sdk/forex";
import { makeMerchantPayment, getMerchantPaymentStatus, getMerchantPaymentOTP } from "./sdk/merchants";
class UBPClient {
    private clientId: string;
    private clientSecret: string;
    private baseUrl: string;
    private fetchImpl: typeof fetch;
    constructor({ clientId, clientSecret, baseUrl = "https://api-uat.unionbankph.com/partners/sb", fetchImpl = fetch }: { clientId: string; clientSecret: string; baseUrl?: string; fetchImpl?: typeof fetch }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.baseUrl = baseUrl;
        this.fetchImpl = fetchImpl;
    }
    async getATMs(): Promise<any> {
        const res = await this.fetchImpl(`${this.baseUrl}/locators/v1/atms`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-ibm-client-id": this.clientId,
                "x-ibm-client-secret": this.clientSecret
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch ATMs: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async makePayment({ payment, accessToken, partnerId }: { payment: any; accessToken: string; partnerId: string }): Promise<any> {
        const res = await this.fetchImpl(`${this.baseUrl}/merchants/v5/payments/single`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-ibm-client-id": this.clientId,
                "x-ibm-client-secret": this.clientSecret,
                authorization: `Bearer ${accessToken}`,
                "x-partner-id": partnerId
            },
            body: JSON.stringify(payment)
        });
        if (!res.ok) {
            throw new Error(`Failed to make payment: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async payBillsAsPartner({ payment, accessToken, partnerId }: { payment: any; accessToken: string; partnerId: string }): Promise<any> {
        const res = await this.fetchImpl(`${this.baseUrl}/partners/v3/payments/single`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-ibm-client-id": this.clientId,
                "x-ibm-client-secret": this.clientSecret,
                authorization: `Bearer ${accessToken}`,
                "x-partner-id": partnerId
            },
            body: JSON.stringify(payment)
        });
        if (!res.ok) {
            throw new Error(`Failed to pay bills as partner: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async payBillsAsCustomer({ payment, accessToken, partnerId }: { payment: any; accessToken: string; partnerId: string }): Promise<any> {
        const res = await this.fetchImpl(`${this.baseUrl}/customers/v3/payments/single`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-ibm-client-id": this.clientId,
                "x-ibm-client-secret": this.clientSecret,
                authorization: `Bearer ${accessToken}`,
                "x-partner-id": partnerId
            },
            body: JSON.stringify(payment)
        });
        if (!res.ok) {
            throw new Error(`Failed to pay bills as customer: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async paymayaTopUp({ payment, accessToken, partnerId }: { payment: any; accessToken: string; partnerId: string }): Promise<any> {
        const res = await this.fetchImpl(`${this.baseUrl}/paymaya/v2/topup`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-ibm-client-id": this.clientId,
                "x-ibm-client-secret": this.clientSecret,
                authorization: `Bearer ${accessToken}`,
                "x-partner-id": partnerId
            },
            body: JSON.stringify(payment)
        });
        if (!res.ok) {
            throw new Error(`Failed to top up Paymaya: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async coinsPHTopUp({ payment, accessToken, partnerId }: { payment: any; accessToken: string; partnerId: string }): Promise<any> {
        const res = await this.fetchImpl(`${this.baseUrl}/coinsph/v2/topup`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-ibm-client-id": this.clientId,
                "x-ibm-client-secret": this.clientSecret,
                authorization: `Bearer ${accessToken}`,
                "x-partner-id": partnerId
            },
            body: JSON.stringify(payment)
        });
        if (!res.ok) {
            throw new Error(`Failed to top up Coins.ph: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async getAccountInfo({ accessToken }: { accessToken: string }): Promise<any> {
        return getAccountInfo({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getCustomerAccountInfo({ accessToken, partnerId, body }: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return getCustomerAccountInfo({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            partnerId,
            body,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async createSandboxAccount({ body }: { body: any }): Promise<any> {
        return createSandboxAccount({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            body,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getAccountBalance({ accountNumber }: { accountNumber: string }): Promise<any> {
        return getAccountBalance({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accountNumber,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getPartnerAccountTransactionHistory({ accessToken, partnerId, query }: { accessToken: string; partnerId: string; query?: Record<string, string> }): Promise<any> {
        return getPartnerAccountTransactionHistory({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            partnerId,
            query,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getCustomerAccountTransactionHistory({ accessToken, partnerId, query }: { accessToken: string; partnerId: string; query?: Record<string, string> }): Promise<any> {
        return getCustomerAccountTransactionHistory({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            partnerId,
            query,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    // --- Transfers ---
    async transferIntrabank(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferIntrabank({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getIntrabankTransferStatus(params: { accessToken: string; partnerId: string; senderRefId: string }): Promise<any> {
        return getIntrabankTransferStatus({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async transferPesonetPartner(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferPesonetPartner({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getPesonetPartnerTransferStatus(params: { accessToken: string; partnerId: string; senderRefId: string }): Promise<any> {
        return getPesonetPartnerTransferStatus({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async transferInstapayPartner(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferInstapayPartner({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getInstapayPartnerTransferStatus(params: { accessToken: string; partnerId: string; senderRefId: string }): Promise<any> {
        return getInstapayPartnerTransferStatus({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async transferPesonetCustomer(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferPesonetCustomer({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getPesonetCustomerTransferStatus(params: { accessToken: string; partnerId: string; senderRefId: string }): Promise<any> {
        return getPesonetCustomerTransferStatus({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async transferInstapayCustomer(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferInstapayCustomer({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getInstapayCustomerTransferStatus(params: { accessToken: string; partnerId: string; senderRefId: string }): Promise<any> {
        return getInstapayCustomerTransferStatus({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async transferPesonetEON(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferPesonetEON({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async transferInstapayEON(params: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return transferInstapayEON({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getInstapayBanks(params: { accessToken: string; partnerId: string }): Promise<any> {
        return getInstapayBanks({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getPesonetBanks(params: { accessToken: string; partnerId: string }): Promise<any> {
        return getPesonetBanks({
            ...params,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getBranches(): Promise<any> {
        return getBranches({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getForexRates(): Promise<any> {
        return getForexRates({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async makeMerchantPayment({ accessToken, partnerId, body }: { accessToken: string; partnerId: string; body: any }): Promise<any> {
        return makeMerchantPayment({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            partnerId,
            body,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getMerchantPaymentStatus({ accessToken, partnerId, partnerRefId }: { accessToken: string; partnerId: string; partnerRefId: string }): Promise<any> {
        return getMerchantPaymentStatus({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            partnerId,
            partnerRefId,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
    async getMerchantPaymentOTP({ accessToken, partnerId, partnerRefId }: { accessToken: string; partnerId: string; partnerRefId: string }): Promise<any> {
        return getMerchantPaymentOTP({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            accessToken,
            partnerId,
            partnerRefId,
            fetchImpl: this.fetchImpl,
            baseUrl: this.baseUrl
        });
    }
}
async function getATMs({ clientId, clientSecret, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const res = await fetchImpl(`${baseUrl}/locators/v1/atms`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-ibm-client-id": clientId,
            "x-ibm-client-secret": clientSecret
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch ATMs: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}
async function authenticatePartner({ clientId, clientSecret, username, password, scope = "", fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; clientSecret: string; username: string; password: string; scope?: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const body = new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        username,
        password,
        ...scope ? {
            scope
        } : {}
    });
    const res = await fetchImpl(`${baseUrl}/partners/v1/oauth2/token`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded"
        },
        body
    });
    if (!res.ok) {
        throw new Error(`Failed to authenticate partner: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}
async function authenticateCustomer({ clientId, code, redirectUri, fetchImpl = fetch, baseUrl = "https://api-uat.unionbankph.com/partners/sb" }: { clientId: string; code: string; redirectUri: string; fetchImpl?: typeof fetch; baseUrl?: string }) {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        redirect_uri: redirectUri
    });
    const res = await fetchImpl(`${baseUrl}/customers/v1/oauth2/token`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded"
        },
        body
    });
    if (!res.ok) {
        throw new Error(`Failed to authenticate customer: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}

export { UBPClient, authenticateCustomer, authenticatePartner, getATMs };
