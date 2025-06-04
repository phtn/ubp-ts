import { test, expect, describe } from "bun:test";
import * as eonCards from "../src/sdk/eonCards";
import { UBPError } from "../src/utils/UBPError";

describe("eonCards SDK parameter validation", () => {
  // Helper for valid params
  const valid = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    partnerId: "d",
    cardToken: "tok",
    body: {},
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // createVirtualAccountWithCard
  test("createVirtualAccountWithCard throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(eonCards.createVirtualAccountWithCard({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.createVirtualAccountWithCard({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.createVirtualAccountWithCard({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.createVirtualAccountWithCard({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.createVirtualAccountWithCard({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("createVirtualAccountWithCard calls fetch on valid params", async () => {
    let called = { value: false };
    await eonCards.createVirtualAccountWithCard({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // activateVirtualCard
  test("activateVirtualCard throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(eonCards.activateVirtualCard({ clientSecret: "b", accessToken: "c", partnerId: "d", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.activateVirtualCard({ clientId: "a", accessToken: "c", partnerId: "d", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.activateVirtualCard({ clientId: "a", clientSecret: "b", partnerId: "d", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.activateVirtualCard({ clientId: "a", clientSecret: "b", accessToken: "c", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.activateVirtualCard({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.activateVirtualCard({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", cardToken: "tok", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("activateVirtualCard calls fetch on valid params", async () => {
    let called = { value: false };
    await eonCards.activateVirtualCard({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // unlockCard
  test("unlockCard throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(eonCards.unlockCard({ clientSecret: "b", accessToken: "c", partnerId: "d", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.unlockCard({ clientId: "a", accessToken: "c", partnerId: "d", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.unlockCard({ clientId: "a", clientSecret: "b", partnerId: "d", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.unlockCard({ clientId: "a", clientSecret: "b", accessToken: "c", cardToken: "tok", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.unlockCard({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(eonCards.unlockCard({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", cardToken: "tok", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("unlockCard calls fetch on valid params", async () => {
    let called = { value: false };
    await eonCards.unlockCard({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 