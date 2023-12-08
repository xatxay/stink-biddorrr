export interface SubmitBatchOrder {
  retCode?: number;
  retMsg?: string;
  result?: {
    list?: ListResult[];
  };
  retExtInfo?: {
    list?: ResultCode[];
  };
  time?: number;
}

interface ListResult {
  category: string;
  symbol: string;
  orderId: string;
  orderLinkId: string;
  createAt: string;
}

interface ResultCode {
  code: number;
  msg: string;
}
