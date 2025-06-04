# UnionBank TypeScript SDK

![CI](https://github.com/phtn/ubp-ts/actions/workflows/ci.yml/badge.svg)

![Test Status](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)
![Coverage](https://img.shields.io/badge/coverage-bun--test-informational?style=flat-square)

---

## Test Status

All core SDK modules are covered by automated tests for parameter validation and error handling. All tests pass with Bun:

```bash
bun test
```

---

## Code Coverage

Bun's test runner supports built-in code coverage reporting. To see coverage:

```bash
bun test --coverage
```

This will print a summary table showing the percentage of functions and lines covered for each file. Example output:

```
-------------|---------|---------|-------------------
File         | % Funcs | % Lines | Uncovered Line #s
-------------|---------|---------|-------------------
All files    |  100.00 |  100.00 |
src/utils/validation.ts | 100.00 | 100.00 |
...
-------------|---------|---------|-------------------
```

You can also generate an lcov report for CI or HTML tools:

```bash
bun test --coverage --coverage-reporter=lcov
```

---

## Quick Start

```ts
import { UBPClient } from "./src";

async function main() {
  const ubp = new UBPClient({
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
  });
  const atms = await ubp.getATMs();
  console.log(atms);
}

main();
```

---

## Pure Functional Usage

```ts
import {
  getATMs,
  authenticatePartner,
  authenticateCustomer,
  getAccountInfo,
  getCustomerAccountInfo,
  createSandboxAccount,
  getAccountBalance,
  getPartnerAccountTransactionHistory,
  getCustomerAccountTransactionHistory,
  getBranches,
  getForexRates,
  payBillsAsCustomer,
  getCustomerBillsPaymentStatus,
  replenishSandboxAccount,
  updateSandboxAccount,
  getCreditCardStatementSummary,
  getCreditCardStatements,
  getCreditCardUnbilled,
  getCreditCardBalances,
  getCreditCardCards,
  getCreditCardPromos,
  makeMerchantPayment,
  getMerchantPaymentStatus,
  getMerchantPaymentOTP,
} from "./src";

// Partner authentication
const partnerToken = await authenticatePartner({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  username: "partner_username",
  password: "partner_password",
  scope: "account payments",
});

// Customer authentication
const customerToken = await authenticateCustomer({
  clientId: "your-client-id",
  code: "authorization_code_from_redirect",
  redirectUri: "your-redirect-uri",
});

// Fetch ATMs
const atms = await getATMs({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

// Fetch Branches
const branches = await getBranches({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

// Get Account Details
const accountInfo = await getAccountInfo({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-or-customer-access-token",
});

// Fetch Forex Rates
const forexRates = await getForexRates({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

// Get Customer Bank Account Details
const customerAccountInfo = await getCustomerAccountInfo({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: { sessionToken: "session-token-from-login" },
});

// Create Sandbox Bank Account
const sandboxAccount = await createSandboxAccount({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  body: {
    username: "jdelacruz",
    password: "password",
    account_name: "Juan Dela Cruz",
  },
});

// Retrieve Account Balance
const balance = await getAccountBalance({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accountNumber: "100076532781",
});

// Retrieve Partner Account Transaction History
const partnerHistory = await getPartnerAccountTransactionHistory({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  query: { fromDate: "2024-01-01", toDate: "2024-01-31" },
});

// Retrieve Customer Account Transaction History
const customerHistory = await getCustomerAccountTransactionHistory({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  query: { fromDate: "2024-01-01", toDate: "2024-01-31" },
});

// --- Transfers ---

// UnionBank-to-UnionBank (Intrabank) Transfer
const intrabankResult = await transferIntrabank({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...TransferRequestv3... */
  },
});

// Intrabank Transfer Status
const intrabankStatus = await getIntrabankTransferStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Partner PESONet Transfer
const pesonetPartnerResult = await transferPesonetPartner({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...PesonetRequest3... */
  },
});

// Partner PESONet Transfer Status
const pesonetPartnerStatus = await getPesonetPartnerTransferStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Partner InstaPay Transfer
const instapayPartnerResult = await transferInstapayPartner({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...InstapayRequest3... */
  },
});

// Partner InstaPay Transfer Status
const instapayPartnerStatus = await getInstapayPartnerTransferStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Customer PESONet Transfer
const pesonetCustomerResult = await transferPesonetCustomer({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...OutwardRequest... */
  },
});

// Customer PESONet Transfer Status
const pesonetCustomerStatus = await getPesonetCustomerTransferStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Customer InstaPay Transfer
const instapayCustomerResult = await transferInstapayCustomer({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...OnlineInstapayRequest... */
  },
});

// Customer InstaPay Transfer Status
const instapayCustomerStatus = await getInstapayCustomerTransferStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// EON Wallet PESONet Transfer
const pesonetEONResult = await transferPesonetEON({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...EONWalletInstapayRequest... */
  },
});

// EON Wallet InstaPay Transfer
const instapayEONResult = await transferInstapayEON({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...EONWalletInstapayRequest... */
  },
});

// Get Instapay Banks
const instapayBanks = await getInstapayBanks({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
});

// Get Pesonet Banks
const pesonetBanks = await getPesonetBanks({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
});

// --- Bills Payment ---

// Pay Bills as Partner
const billsPartnerResult = await payBillsAsPartner({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    senderRefId: "UBP0065",
    tranRequestDate: "2024-06-01T12:00:00.000Z",
    biller: { id: "0001", name: "Test Biller" },
    amount: { currency: "PHP", value: "100" },
    remarks: "Payment remarks",
    particulars: "Payment particulars",
    references: [{ index: 1, name: "Payor", value: "1231231212" }],
  },
});

// Get Partner Bills Payment Status
const billsPartnerStatus = await getPartnerBillsPaymentStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "UBP0065",
});

// Pay Bills as Customer
const billsCustomerResult = await payBillsAsCustomer({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: {
    senderRefId: "UBP0065",
    tranRequestDate: "2024-06-01T12:00:00.000Z",
    biller: { id: "0001", name: "Test Biller" },
    amount: { currency: "PHP", value: "100" },
    remarks: "Payment remarks",
    particulars: "Payment particulars",
    references: [{ index: 1, name: "Payor", value: "1231231212" }],
  },
});

// Get Customer Bills Payment Status
const billsCustomerStatus = await getCustomerBillsPaymentStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  senderRefId: "UBP0065",
});

// --- Deposits ---

// Replenish Sandbox Account
const depositResult = await replenishSandboxAccount({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
  body: { amount: "10000" },
});

// Update Sandbox Account
const updateResult = await updateSandboxAccount({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
  body: { amount: "5000" },
});

// --- Credit Card ---

// Get Credit Card Statement Summary
const ccSummary = await getCreditCardStatementSummary({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
});

// Get Credit Card Statements
const ccStatements = await getCreditCardStatements({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
});

// Get Credit Card Unbilled Transactions
const ccUnbilled = await getCreditCardUnbilled({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
});

// Get Credit Card Balances
const ccBalances = await getCreditCardBalances({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
});

// Get Availed Credit Cards
const ccCards = await getCreditCardCards({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "your-access-token",
});

// Get Credit Card Promos
const ccPromos = await getCreditCardPromos({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  partnerId: "your-partner-id",
});

// --- Merchant Payments ---

// Make Merchant Payment
const merchantPayment = await makeMerchantPayment({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...PaymentRequestv5... */
  },
});

// Get Merchant Payment Status
const merchantPaymentStatus = await getMerchantPaymentStatus({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  partnerRefId: "your-partner-ref-id",
});

// Get Merchant Payment OTP
const merchantPaymentOTP = await getMerchantPaymentOTP({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  partnerRefId: "your-partner-ref-id",
});
```

---

## UBPClient Class Usage

```ts
import { UBPClient } from "./src";

const ubp = new UBPClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

// Fetch ATMs
const atms = await ubp.getATMs();

// Fetch Branches
const branches = await ubp.getBranches();

// Get Account Details
const accountInfo = await ubp.getAccountInfo({
  accessToken: "partner-or-customer-access-token",
});

// Fetch Forex Rates
const forexRates = await ubp.getForexRates();

// Get Customer Bank Account Details
const customerAccountInfo = await ubp.getCustomerAccountInfo({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: { sessionToken: "session-token-from-login" },
});

// Create Sandbox Bank Account
const sandboxAccount = await ubp.createSandboxAccount({
  body: {
    username: "jdelacruz",
    password: "password",
    account_name: "Juan Dela Cruz",
  },
});

// Retrieve Account Balance
const balance = await ubp.getAccountBalance({ accountNumber: "100076532781" });

// Retrieve Partner Account Transaction History
const partnerHistory = await ubp.getPartnerAccountTransactionHistory({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  query: { fromDate: "2024-01-01", toDate: "2024-01-31" },
});

// Retrieve Customer Account Transaction History
const customerHistory = await ubp.getCustomerAccountTransactionHistory({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  query: { fromDate: "2024-01-01", toDate: "2024-01-31" },
});

// --- Transfers ---

// UnionBank-to-UnionBank (Intrabank) Transfer
const intrabankResult = await ubp.transferIntrabank({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...TransferRequestv3... */
  },
});

// Intrabank Transfer Status
const intrabankStatus = await ubp.getIntrabankTransferStatus({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Partner PESONet Transfer
const pesonetPartnerResult = await ubp.transferPesonetPartner({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...PesonetRequest3... */
  },
});

// Partner PESONet Transfer Status
const pesonetPartnerStatus = await ubp.getPesonetPartnerTransferStatus({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Partner InstaPay Transfer
const instapayPartnerResult = await ubp.transferInstapayPartner({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...InstapayRequest3... */
  },
});

// Partner InstaPay Transfer Status
const instapayPartnerStatus = await ubp.getInstapayPartnerTransferStatus({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Customer PESONet Transfer
const pesonetCustomerResult = await ubp.transferPesonetCustomer({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...OutwardRequest... */
  },
});

// Customer PESONet Transfer Status
const pesonetCustomerStatus = await ubp.getPesonetCustomerTransferStatus({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// Customer InstaPay Transfer
const instapayCustomerResult = await ubp.transferInstapayCustomer({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...OnlineInstapayRequest... */
  },
});

// Customer InstaPay Transfer Status
const instapayCustomerStatus = await ubp.getInstapayCustomerTransferStatus({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  senderRefId: "your-sender-ref-id",
});

// EON Wallet PESONet Transfer
const pesonetEONResult = await ubp.transferPesonetEON({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...EONWalletInstapayRequest... */
  },
});

// EON Wallet InstaPay Transfer
const instapayEONResult = await ubp.transferInstapayEON({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...EONWalletInstapayRequest... */
  },
});

// Get Instapay Banks
const instapayBanks = await ubp.getInstapayBanks({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
});

// Get Pesonet Banks
const pesonetBanks = await ubp.getPesonetBanks({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
});

// --- Bills Payment ---

// Pay Bills as Partner
const billsPartnerResult = await ubp.payBillsAsPartner({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    senderRefId: "UBP0065",
    tranRequestDate: "2024-06-01T12:00:00.000Z",
    biller: { id: "0001", name: "Test Biller" },
    amount: { currency: "PHP", value: "100" },
    remarks: "Payment remarks",
    particulars: "Payment particulars",
    references: [{ index: 1, name: "Payor", value: "1231231212" }],
  },
});

// Get Partner Bills Payment Status
const billsPartnerStatus = await ubp.getPartnerBillsPaymentStatus({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  senderRefId: "UBP0065",
});

// Pay Bills as Customer
const billsCustomerResult = await ubp.payBillsAsCustomer({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  body: {
    senderRefId: "UBP0065",
    tranRequestDate: "2024-06-01T12:00:00.000Z",
    biller: { id: "0001", name: "Test Biller" },
    amount: { currency: "PHP", value: "100" },
    remarks: "Payment remarks",
    particulars: "Payment particulars",
    references: [{ index: 1, name: "Payor", value: "1231231212" }],
  },
});

// Get Customer Bills Payment Status
const billsCustomerStatus = await ubp.getCustomerBillsPaymentStatus({
  accessToken: "customer-access-token",
  partnerId: "your-partner-id",
  senderRefId: "UBP0065",
});

// --- Deposits ---

// Replenish Sandbox Account
const depositResult = await ubp.replenishSandboxAccount({
  accessToken: "your-access-token",
  body: { amount: "10000" },
});

// Update Sandbox Account
const updateResult = await ubp.updateSandboxAccount({
  accessToken: "your-access-token",
  body: { amount: "5000" },
});

// --- Credit Card ---

// Get Credit Card Statement Summary
const ccSummary = await ubp.getCreditCardStatementSummary({
  accessToken: "your-access-token",
});

// Get Credit Card Statements
const ccStatements = await ubp.getCreditCardStatements({
  accessToken: "your-access-token",
});

// Get Credit Card Unbilled Transactions
const ccUnbilled = await ubp.getCreditCardUnbilled({
  accessToken: "your-access-token",
});

// Get Credit Card Balances
const ccBalances = await ubp.getCreditCardBalances({
  accessToken: "your-access-token",
});

// Get Availed Credit Cards
const ccCards = await ubp.getCreditCardCards({
  accessToken: "your-access-token",
});

// Get Credit Card Promos
const ccPromos = await ubp.getCreditCardPromos({
  partnerId: "your-partner-id",
});

// --- Merchant Payments ---

// Make Merchant Payment
const merchantPayment = await ubp.makeMerchantPayment({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  body: {
    /* ...PaymentRequestv5... */
  },
});

// Get Merchant Payment Status
const merchantPaymentStatus = await ubp.getMerchantPaymentStatus({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  partnerRefId: "your-partner-ref-id",
});

// Get Merchant Payment OTP
const merchantPaymentOTP = await ubp.getMerchantPaymentOTP({
  accessToken: "partner-access-token",
  partnerId: "your-partner-id",
  partnerRefId: "your-partner-ref-id",
});
```

---

## Parameter Validation & Error Handling

All SDK functions automatically validate required parameters. If a required parameter is missing or invalid, the function will throw a `UBPError` with code `VALIDATION_ERROR` and a descriptive message.

### Example: Handling Validation Errors

```ts
import { getAccountInfo } from "./src";

try {
  // Missing required parameter 'clientId'
  await getAccountInfo({ clientSecret: "...", accessToken: "..." });
} catch (err) {
  if (err.code === "VALIDATION_ERROR") {
    console.error("Validation failed:", err.message);
  } else {
    throw err;
  }
}
```

- All errors thrown by the SDK are instances of `UBPError`.
- For API errors, the error code and response body are included.
- For validation errors, the error code is `VALIDATION_ERROR` and the message describes the missing or invalid parameter.

---

## Features

- Pure functional, no classes or singletons
- All types generated from OpenAPI
- Transport-agnostic (inject your own fetch if needed)
- Supports both Partner and Customer OAuth2 authentication

To install dependencies:

```bash
bun install
```
