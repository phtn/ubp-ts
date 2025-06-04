import { test, expect, describe } from "bun:test";
import * as merchants from "../src/sdk/merchants";
import { UBPError } from "../src/utils/UBPError";

describe("merchants SDK parameter validation", () => {
  const valid = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    partnerId: "d",
    partnerRefId: "ref123",
    body: {},
  };
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({}) }); });

  // makeMerchantPayment
  test("makeMerchantPayment throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(merchants.makeMerchantPayment({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.makeMerchantPayment({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.makeMerchantPayment({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.makeMerchantPayment({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.makeMerchantPayment({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("makeMerchantPayment calls fetch on valid params", async () => {
    let called = { value: false };
    await merchants.makeMerchantPayment({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // getMerchantPaymentStatus
  test("getMerchantPaymentStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(merchants.getMerchantPaymentStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentStatus({ clientId: "a", accessToken: "c", partnerId: "d", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentStatus({ clientId: "a", clientSecret: "b", partnerId: "d", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", partnerRefId: undefined, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getMerchantPaymentStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await merchants.getMerchantPaymentStatus({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // getMerchantPaymentOTP
  test("getMerchantPaymentOTP throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(merchants.getMerchantPaymentOTP({ clientSecret: "b", accessToken: "c", partnerId: "d", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentOTP({ clientId: "a", accessToken: "c", partnerId: "d", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentOTP({ clientId: "a", clientSecret: "b", partnerId: "d", partnerRefId: "ref123", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentOTP({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(merchants.getMerchantPaymentOTP({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", partnerRefId: undefined, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getMerchantPaymentOTP calls fetch on valid params", async () => {
    let called = { value: false };
    await merchants.getMerchantPaymentOTP({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 