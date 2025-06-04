import { test, expect, describe } from "bun:test";
import * as accounts from "../src/sdk/accounts";
import { UBPError } from "../src/utils/UBPError";

describe("accounts SDK parameter validation", () => {
  test("getAccountInfo throws on missing params", async () => {
    const fetchMock = () => Promise.resolve({ ok: true, json: async () => ({ success: true }) });
    await expect(accounts.getAccountInfo({ clientSecret: "x", accessToken: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getAccountInfo({ clientId: "x", accessToken: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getAccountInfo({ clientId: "x", clientSecret: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });

  test("getAccountInfo calls fetch on valid params", async () => {
    let called = false;
    const fetchMock = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); };
    await accounts.getAccountInfo({ clientId: "a", clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any });
    expect(called).toBe(true);
  });

  test("getCustomerAccountInfo throws on missing params", async () => {
    const fetchMock = () => Promise.resolve({ ok: true, json: async () => ({ success: true }) });
    const body = { sessionToken: "foo" };
    await expect(accounts.getCustomerAccountInfo({ clientSecret: "x", accessToken: "y", partnerId: "z", body, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountInfo({ clientId: "x", accessToken: "y", partnerId: "z", body, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountInfo({ clientId: "x", clientSecret: "y", partnerId: "z", body, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountInfo({ clientId: "x", clientSecret: "y", accessToken: "z", body, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountInfo({ clientId: "x", clientSecret: "y", accessToken: "z", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });

  test("getCustomerAccountInfo calls fetch on valid params", async () => {
    let called = false;
    const fetchMock = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); };
    await accounts.getCustomerAccountInfo({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", body: { sessionToken: "foo" }, fetchImpl: fetchMock as any });
    expect(called).toBe(true);
  });

  test("createSandboxAccount throws on missing params", async () => {
    const fetchMock = () => Promise.resolve({ ok: true, json: async () => ({ success: true }) });
    await expect(accounts.createSandboxAccount({ clientSecret: "x", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.createSandboxAccount({ clientId: "x", body: {}, fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.createSandboxAccount({ clientId: "x", clientSecret: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });

  test("createSandboxAccount calls fetch on valid params", async () => {
    let called = false;
    const fetchMock = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); };
    await accounts.createSandboxAccount({ clientId: "a", clientSecret: "b", body: {}, fetchImpl: fetchMock as any });
    expect(called).toBe(true);
  });

  test("getAccountBalance throws on missing params", async () => {
    const fetchMock = () => Promise.resolve({ ok: true, json: async () => ({ success: true }) });
    await expect(accounts.getAccountBalance({ clientSecret: "x", accountNumber: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getAccountBalance({ clientId: "x", accountNumber: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getAccountBalance({ clientId: "x", clientSecret: "y", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });

  test("getAccountBalance calls fetch on valid params", async () => {
    let called = false;
    const fetchMock = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); };
    await accounts.getAccountBalance({ clientId: "a", clientSecret: "b", accountNumber: "c", fetchImpl: fetchMock as any });
    expect(called).toBe(true);
  });

  test("getPartnerAccountTransactionHistory throws on missing params", async () => {
    const fetchMock = () => Promise.resolve({ ok: true, json: async () => ({ success: true }) });
    await expect(accounts.getPartnerAccountTransactionHistory({ clientSecret: "x", accessToken: "y", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getPartnerAccountTransactionHistory({ clientId: "x", accessToken: "y", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getPartnerAccountTransactionHistory({ clientId: "x", clientSecret: "y", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getPartnerAccountTransactionHistory({ clientId: "x", clientSecret: "y", accessToken: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });

  test("getPartnerAccountTransactionHistory calls fetch on valid params", async () => {
    let called = false;
    const fetchMock = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); };
    await accounts.getPartnerAccountTransactionHistory({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any });
    expect(called).toBe(true);
  });

  test("getCustomerAccountTransactionHistory throws on missing params", async () => {
    const fetchMock = () => Promise.resolve({ ok: true, json: async () => ({ success: true }) });
    await expect(accounts.getCustomerAccountTransactionHistory({ clientSecret: "x", accessToken: "y", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountTransactionHistory({ clientId: "x", accessToken: "y", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountTransactionHistory({ clientId: "x", clientSecret: "y", partnerId: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(accounts.getCustomerAccountTransactionHistory({ clientId: "x", clientSecret: "y", accessToken: "z", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });

  test("getCustomerAccountTransactionHistory calls fetch on valid params", async () => {
    let called = false;
    const fetchMock = () => { called = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); };
    await accounts.getCustomerAccountTransactionHistory({ clientId: "a", clientSecret: "b", accessToken: "c", partnerId: "d", fetchImpl: fetchMock as any });
    expect(called).toBe(true);
  });
}); 