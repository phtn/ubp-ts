import { test, expect, describe } from "bun:test";
import { getATMs } from "../src/sdk/atms";
import { UBPError } from "../src/utils/UBPError";

describe("atms SDK parameter validation", () => {
  // Helper for valid params
  const valid = {
    clientId: "a",
    clientSecret: "b",
  };

  // Helper fetch
  const makeFetch = (called: { value: boolean }) => ((...args: any[]) => { called.value = true; return Promise.resolve({ ok: true, json: async () => ({ success: true }) }); });

  test("getATMs throws on missing params", async () => {
    const fetchMock = (() => Promise.resolve({ ok: true, json: async () => ({}) }));
    await expect(getATMs({ clientSecret: "b", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
    await expect(getATMs({ clientId: "a", fetchImpl: fetchMock as any } as any)).rejects.toThrow(UBPError);
  });
  test("getATMs calls fetch on valid params", async () => {
    let called = { value: false };
    await getATMs({ ...valid, fetchImpl: makeFetch(called) as any });
    expect(called.value).toBe(true);
  });
}); 