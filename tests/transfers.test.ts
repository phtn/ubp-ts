import { test, expect, describe } from "bun:test";
import * as transfers from "../src/sdk/transfers";
import { UBPError } from "../src/utils/UBPError";

describe("transfers SDK parameter validation", () => {
  // Helper for valid params
  const valid = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    partnerId: "d",
    senderRefId: "e",
    body: {},
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // transferIntrabank
  test("transferIntrabank throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferIntrabank({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferIntrabank({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferIntrabank({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferIntrabank({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferIntrabank({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferIntrabank calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferIntrabank({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getIntrabankTransferStatus
  test("getIntrabankTransferStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getIntrabankTransferStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getIntrabankTransferStatus({ clientId: "a", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getIntrabankTransferStatus({ clientId: "a", clientSecret: "b", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getIntrabankTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getIntrabankTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getIntrabankTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getIntrabankTransferStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getIntrabankTransferStatus({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // transferPesonetPartner
  test("transferPesonetPartner throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferPesonetPartner({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetPartner({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetPartner({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetPartner({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetPartner({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferPesonetPartner calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferPesonetPartner({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getPesonetPartnerTransferStatus
  test("getPesonetPartnerTransferStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getPesonetPartnerTransferStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetPartnerTransferStatus({ clientId: "a", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetPartnerTransferStatus({ clientId: "a", clientSecret: "b", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetPartnerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetPartnerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetPartnerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getPesonetPartnerTransferStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getPesonetPartnerTransferStatus({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // transferInstapayPartner
  test("transferInstapayPartner throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferInstapayPartner({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayPartner({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayPartner({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayPartner({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayPartner({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferInstapayPartner calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferInstapayPartner({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getInstapayPartnerTransferStatus
  test("getInstapayPartnerTransferStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getInstapayPartnerTransferStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayPartnerTransferStatus({ clientId: "a", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayPartnerTransferStatus({ clientId: "a", clientSecret: "b", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayPartnerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayPartnerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayPartnerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getInstapayPartnerTransferStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getInstapayPartnerTransferStatus({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // transferPesonetCustomer
  test("transferPesonetCustomer throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferPesonetCustomer({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetCustomer({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetCustomer({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetCustomer({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetCustomer({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferPesonetCustomer calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferPesonetCustomer({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getPesonetCustomerTransferStatus
  test("getPesonetCustomerTransferStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getPesonetCustomerTransferStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetCustomerTransferStatus({ clientId: "a", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetCustomerTransferStatus({ clientId: "a", clientSecret: "b", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetCustomerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetCustomerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetCustomerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getPesonetCustomerTransferStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getPesonetCustomerTransferStatus({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // transferInstapayCustomer
  test("transferInstapayCustomer throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferInstapayCustomer({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayCustomer({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayCustomer({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayCustomer({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayCustomer({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferInstapayCustomer calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferInstapayCustomer({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getInstapayCustomerTransferStatus
  test("getInstapayCustomerTransferStatus throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getInstapayCustomerTransferStatus({ clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayCustomerTransferStatus({ clientId: "a", accessToken: "c", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayCustomerTransferStatus({ clientId: "a", clientSecret: "b", partnerId: "d", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayCustomerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", senderRefId: "e", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayCustomerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayCustomerTransferStatus({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", senderRefId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getInstapayCustomerTransferStatus calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getInstapayCustomerTransferStatus({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // transferPesonetEON
  test("transferPesonetEON throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferPesonetEON({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetEON({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetEON({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetEON({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferPesonetEON({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferPesonetEON calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferPesonetEON({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // transferInstapayEON
  test("transferInstapayEON throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.transferInstapayEON({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayEON({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayEON({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayEON({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.transferInstapayEON({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("transferInstapayEON calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.transferInstapayEON({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getInstapayBanks
  test("getInstapayBanks throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getInstapayBanks({ clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayBanks({ clientId: "a", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayBanks({ clientId: "a", clientSecret: "b", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayBanks({ clientId: "a", clientSecret: "b", accessToken: "c", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getInstapayBanks({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getInstapayBanks calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getInstapayBanks({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });

  // getPesonetBanks
  test("getPesonetBanks throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) })) as any;
    await expect(transfers.getPesonetBanks({ clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetBanks({ clientId: "a", accessToken: "c", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetBanks({ clientId: "a", clientSecret: "b", partnerId: "d", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetBanks({ clientId: "a", clientSecret: "b", accessToken: "c", fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
    await expect(transfers.getPesonetBanks({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: undefined, fetchImpl: fetchMock } as any)).rejects.toThrow(UBPError);
  });
  test("getPesonetBanks calls fetch on valid params", async () => {
    let called = { value: false };
    await transfers.getPesonetBanks({ ...valid, fetchImpl: makeFetch(called) });
    expect(called.value).toBe(true);
  });
});
