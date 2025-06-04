export interface ATM {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type ATMsResponse = ATM[]; 