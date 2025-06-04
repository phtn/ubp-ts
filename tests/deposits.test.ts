import { test, expect, describe } from "bun:test";
import * as deposits from "../src/sdk/deposits";
import { UBPError } from "../src/utils/UBPError";

describe("deposits SDK parameter validation", () => {
  // Helper for valid params
  const valid = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
    body: {},
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // replenishSandboxAccount
  test("replenishSandboxAccount throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(deposits.replenishSandboxAccount({ clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(deposits.replenishSandboxAccount({ clientId: "a", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(deposits.replenishSandboxAccount({ clientId: "a", clientSecret: "b", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(deposits.replenishSandboxAccount({ clientId: "a", clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("replenishSandboxAccount calls fetch on valid params", async () => {
    let called = { value: false };
    await deposits.replenishSandboxAccount({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // updateSandboxAccount
  test("updateSandboxAccount throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(deposits.updateSandboxAccount({ clientSecret: "b", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(deposits.updateSandboxAccount({ clientId: "a", accessToken: "c", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(deposits.updateSandboxAccount({ clientId: "a", clientSecret: "b", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(deposits.updateSandboxAccount({ clientId: "a", clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("updateSandboxAccount calls fetch on valid params", async () => {
    let called = { value: false };
    await deposits.updateSandboxAccount({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 