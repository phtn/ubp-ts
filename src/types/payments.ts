export interface PaymentRequestV5 {
  senderRefId: string;
  tranRequestDate: string;
  requestId?: string;
  otp?: string;
  amount: {
    currency: string;
    value: string;
  };
  remarks: string;
  particulars: string;
  info: Array<{
    index: number;
    name: string;
    value: string;
  }>;
}

export interface PaymentResponseV5 {
  payload: {
    code: string;
    senderRefId: string;
    state: string;
    uuid: string;
    description: string;
    type: string;
    amount: number;
    ubpTranId: string;
    tranRequestDate: string;
  };
  signature: string;
}

export interface PayBillsViaPartnerRequest {
  senderRefId: string;
  tranRequestDate: string;
  biller: {
    id: string;
    name: string;
  };
  amount: {
    currency: string;
    value: string;
  };
  remarks: string;
  particulars: string;
  references: Array<{
    index: number;
    name: string;
    value: string;
  }>;
}

export interface PayBillsViaPartnerResponse {
  ubpTranId: string;
  createdAt: string;
  state: string;
  senderRefId: string;
}

export interface PaymayaRequest {
  senderRefId: string;
  tranRequestDate: string;
  amount: {
    currency: string;
    value: string;
  };
  depositor: {
    name: string;
    mobileNumber: string;
  };
}

export interface PaymayaResponse {
  ubpTranId: string;
  createdAt: string;
  state: string;
  senderRefId: string;
}

export interface CoinsPHRequest {
  senderRefId: string;
  tranRequestDate: string;
  amount: {
    currency: string;
    value: string;
  };
  depositor: {
    name: string;
    referenceNumber: string;
  };
}

export interface CoinsPHResponse {
  ubpTranId: string;
  createdAt: string;
  state: string;
  senderRefId: string;
} 