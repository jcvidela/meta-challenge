export interface IMetaStockData {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    mic_code: string;
    exchange: string;
    type: string;
  }
  
  export interface IValuesStockData {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }
  
  export interface IStockData {
    meta: IMetaStockData;
    values: IValuesStockData[];
    status: string;
  }

  export interface IStock {
    symbol: string;
    name: string;
    currency: string;
    type: string;
  }