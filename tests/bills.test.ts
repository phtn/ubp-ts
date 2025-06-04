import { test, expect, describe } from "bun:test";
import * as bills from "../src/sdk/bills";
import { UBPError } from "../src/utils/UBPError";

describe("bills SDK parameter validation", () => {
  // Helper for valid params
  const valid = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    partnerId: "d",
    body: {},
    senderRefId: "ref123",
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // payBillsAsPartner
  test("payBillsAsPartner throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(bills.payBillsAsPartner({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsPartner({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsPartner({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsPartner({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsPartner({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("payBillsAsPartner calls fetch on valid params", async () => {
    let called = { value: false };
    await bills.payBillsAsPartner({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // payBillsAsCustomer
  test("payBillsAsCustomer throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(bills.payBillsAsCustomer({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsCustomer({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsCustomer({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsCustomer({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.payBillsAsCustomer({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("payBillsAsCustomer calls fetch on valid params", async () => {
    let called = { value: false };
    await bills.payBillsAsCustomer({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // getCustomerBillsPaymentStatus
  test("getCustomerBillsPaymentStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(bills.getCustomerBillsPaymentStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.getCustomerBillsPaymentStatus({ clientId: "a", accessToken: "c", partnerId: "d", senderRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.getCustomerBillsPaymentStatus({ clientId: "a", clientSecret: "b", partnerId: "d", senderRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.getCustomerBillsPaymentStatus({ clientId: "a", clientSecret: "b", accessToken: "c", senderRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(bills.getCustomerBillsPaymentStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getCustomerBillsPaymentStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await bills.getCustomerBillsPaymentStatus({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 