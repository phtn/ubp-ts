import { test, expect, describe } from "bun:test";
import * as auth from "../src/sdk/auth";
import { UBPError } from "../src/utils/UBPError";

describe("auth SDK parameter validation", () => {
  // Helper for valid params
  const validPartner = {
    clientId: "a",
    clientSecret: "b",
    username: "c",
    password: "d",
  };
  const validCustomer = {
    clientId: "a",
    code: "b",
    redirectUri: "c",
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // authenticatePartner
  test("authenticatePartner throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(auth.authenticatePartner({ clientSecret: "b", username: "c", password: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(auth.authenticatePartner({ clientId: "a", username: "c", password: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(auth.authenticatePartner({ clientId: "a", clientSecret: "b", password: "d", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(auth.authenticatePartner({ clientId: "a", clientSecret: "b", username: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("authenticatePartner calls fetch on valid params", async () => {
    let called = { value: false };
    await auth.authenticatePartner({ ...validPartner, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // authenticateCustomer
  test("authenticateCustomer throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(auth.authenticateCustomer({ code: "b", redirectUri: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(auth.authenticateCustomer({ clientId: "a", redirectUri: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(auth.authenticateCustomer({ clientId: "a", code: "b", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("authenticateCustomer calls fetch on valid params", async () => {
    let called = { value: false };
    await auth.authenticateCustomer({ ...validCustomer, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 