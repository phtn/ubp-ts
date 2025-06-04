// Validation utilities for UBP SDK
// Provides helpers for required parameter checks, type validation, and object shape validation

import { UBPError } from "./UBPError";

/**
 * Throws a UBPError if a required parameter is missing or undefined/null.
 * @param param The parameter value
 * @param name The parameter name
 */
export function requireParam<T>(param: T, name: string): asserts param is NonNullable<T> {
  if (param === undefined || param === null) {
    throw new UBPError({
      code: "VALIDATION_ERROR",
      message: `Missing required parameter: ${name}`
    });
  }
}

/**
 * Validates that a value is of the expected type (typeof).
 * Throws a UBPError if not.
 */
export function requireType<T>(value: T, type: string, name: string): void {
  if (typeof value !== type) {
    throw new UBPError({
      code: "VALIDATION_ERROR",
      message: `Parameter '${name}' must be of type ${type}, got ${typeof value}`
    });
  }
}

/**
 * Validates that an object has all required keys (shallow check).
 * Throws a UBPError if any are missing.
 */
export function requireKeys(obj: object, keys: string[], context = "object"): void {
  for (const key of keys) {
    if (!(key in obj)) {
      throw new UBPError({
        code: "VALIDATION_ERROR",
        message: `Missing required key '${key}' in ${context}`
      });
    }
  }
}

/**
 * Validates that a value is one of the allowed enum values.
 * Throws a UBPError if not.
 */
export function requireEnum<T>(value: T, allowed: readonly T[], name: string): void {
  if (!allowed.includes(value)) {
    throw new UBPError({
      code: "VALIDATION_ERROR",
      message: `Parameter '${name}' must be one of: ${allowed.join(", ")}. Got: ${value}`
    });
  }
}

// Optionally, add more helpers as needed (e.g., regex, min/max, etc.) 