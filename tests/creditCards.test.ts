import { test, expect, describe } from "bun:test";
import * as creditCards from "../src/sdk/creditCards";
import { UBPError } from "../src/utils/UBPError";

describe("creditCards SDK parameter validation", () => {
  // Helper for valid params
  const valid = {
    clientId: "a",
    clientSecret: "b",
    accessToken: "c",
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  // getCreditCardStatementSummary
  test("getCreditCardStatementSummary throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(creditCards.getCreditCardStatementSummary({ clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(creditCards.getCreditCardStatementSummary({ clientId: "a", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(creditCards.getCreditCardStatementSummary({ clientId: "a", clientSecret: "b", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getCreditCardStatementSummary calls fetch on valid params", async () => {
    let called = { value: false };
    await creditCards.getCreditCardStatementSummary({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // getCreditCardStatements
  test("getCreditCardStatements throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(creditCards.getCreditCardStatements({ clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(creditCards.getCreditCardStatements({ clientId: "a", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(creditCards.getCreditCardStatements({ clientId: "a", clientSecret: "b", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getCreditCardStatements calls fetch on valid params", async () => {
    let called = { value: false };
    await creditCards.getCreditCardStatements({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });

  // getCreditCardUnbilled
  test("getCreditCardUnbilled throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(creditCards.getCreditCardUnbilled({ clientSecret: "b", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(creditCards.getCreditCardUnbilled({ clientId: "a", accessToken: "c", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(creditCards.getCreditCardUnbilled({ clientId: "a", clientSecret: "b", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getCreditCardUnbilled calls fetch on valid params", async () => {
    let called = { value: false };
    await creditCards.getCreditCardUnbilled({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 