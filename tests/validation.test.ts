import { requireParam, requireType, requireKeys, requireEnum } from "../src/utils/validation";
import { UBPError } from "../src/utils/UBPError";
import { test, expect } from "bun:test";

// requireParam
test("requireParam throws on undefined", () => {
  expect(() => requireParam(undefined, "foo")).toThrow(UBPError);
});

test("requireParam throws on null", () => {
  expect(() => requireParam(null, "foo")).toThrow(UBPError);
});

test("requireParam passes on value", () => {
  expect(() => requireParam("bar", "foo")).not.toThrow();
});

// requireType
test("requireType throws on wrong type", () => {
  expect(() => requireType(123, "string", "foo")).toThrow(UBPError);
});

test("requireType passes on correct type", () => {
  expect(() => requireType("bar", "string", "foo")).not.toThrow();
});

// requireKeys
test("requireKeys throws on missing key", () => {
  expect(() => requireKeys({ a: 1 }, ["a", "b"], "obj")).toThrow(UBPError);
});

test("requireKeys passes when all keys present", () => {
  expect(() => requireKeys({ a: 1, b: 2 }, ["a", "b"], "obj")).not.toThrow();
});

// requireEnum
test("requireEnum throws on invalid value", () => {
  expect(() => requireEnum("c", ["a", "b"], "foo")).toThrow(UBPError);
});

test("requireEnum passes on valid value", () => {
  expect(() => requireEnum("a", ["a", "b"], "foo")).not.toThrow();
}); 