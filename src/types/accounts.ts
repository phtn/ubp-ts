import type { components } from "../types/openapi.generated";

// Types
type AccountInformationResponse =
  components["schemas"]["AccountInformationResponse"];
type OnlineAccountInformation =
  components["schemas"]["OnlineAccountInformation"];
type OnlineAccountInformationResponse =
  components["schemas"]["OnlineAccountInformationResponse"];
type SandboxRequest = components["schemas"]["SandboxRequest"];
type SandboxResponse = components["schemas"]["SandboxResponse"];
type SandboxErrors = components["schemas"]["SandboxErrors"];
type AccountBalances = components["schemas"]["AccountBalances"];
type AccountBalancesErrors = components["schemas"]["AccountBalancesErrors"];
type AccountHistoryResponse = components["schemas"]["AccountHistoryResponse"];

export type {
  AccountInformationResponse,
  OnlineAccountInformation,
  OnlineAccountInformationResponse,
  SandboxRequest,
  SandboxResponse,
  SandboxErrors,
  AccountBalances,
  AccountBalancesErrors,
  AccountHistoryResponse,
};
