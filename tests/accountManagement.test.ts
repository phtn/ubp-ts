import { test, expect, describe } from "bun:test";
import * as accountManagement from "../src/sdk/accountManagement";
import { UBPError } from "../src/utils/UBPError";

describe("accountManagement SDK parameter validation", () => {
  // Helpers for valid params
  const validSubmit = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    body: {},
  };
  const validOverdraft = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    partnerId: "d",
    body: {},
  };
  const validUpgrade = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    partnerId: "d",
    body: {},
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // submitAccountApplication
  test("submitAccountApplication throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(accountManagement.submitAccountApplication({ clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.submitAccountApplication({ clientId: "a", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.submitAccountApplication({ clientId: "a", clientSecret: "b", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.submitAccountApplication({ clientId: "a", clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("submitAccountApplication calls fetch on valid params", async () => {
    let called = { value: false };
    await accountManagement.submitAccountApplication({ ...validSubmit, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // createOverdraftAccount
  test("createOverdraftAccount throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(accountManagement.createOverdraftAccount({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.createOverdraftAccount({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.createOverdraftAccount({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.createOverdraftAccount({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.createOverdraftAccount({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("createOverdraftAccount calls fetch on valid params", async () => {
    let called = { value: false };
    await accountManagement.createOverdraftAccount({ ...validOverdraft, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // upgradeEONWalletAccount
  test("upgradeEONWalletAccount throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(accountManagement.upgradeEONWalletAccount({ clientSecret: "b", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.upgradeEONWalletAccount({ clientId: "a", accessToken: "c", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.upgradeEONWalletAccount({ clientId: "a", clientSecret: "b", partnerId: "d", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.upgradeEONWalletAccount({ clientId: "a", clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accountManagement.upgradeEONWalletAccount({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("upgradeEONWalletAccount calls fetch on valid params", async () => {
    let called = { value: false };
    await accountManagement.upgradeEONWalletAccount({ ...validUpgrade, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 