import { test, expect, describe } from "bun:test";
import { getForexRates } from "../src/sdk/forex";
import { UBPError } from "../src/utils/UBPError";

describe("forex SDK parameter validation", () => {
  test("getForexRates throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(getForexRates({ clientSecret: "b", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(getForexRates({ clientId: "a", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getForexRates calls fetch on valid params", async () => {
    let called = { value: false };
    await getForexRates({ clientId: "a", clientSecret: "b", fetchImpl: ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({}) }); }) as any });
    expect(called.value).toBe(true);
  });
}); 