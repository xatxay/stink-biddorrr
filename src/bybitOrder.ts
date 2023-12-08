import {
  GetKlineParamsV5,
  APIResponseV3WithTime,
  CategorySymbolListV5,
  OHLCVKlineV5,
} from 'bybit-api';
import BybitClient from './bybitClient.js';
import { SubmitBatchOrder } from './interface.js';

class BybitOrder extends BybitClient {
  private category: GetKlineParamsV5['category'] = 'linear';
  private interval: GetKlineParamsV5['interval'] = 'D';
  constructor() {
    super();
  }

  public async getPrice(
    symbol: string,
    start?: number,
  ): Promise<
    APIResponseV3WithTime<
      CategorySymbolListV5<OHLCVKlineV5[], 'spot' | 'linear' | 'inverse'>
    >
  > {
    try {
      const response = await this.client.getKline({
        category: this.category,
        symbol: symbol,
        interval: this.interval,
        start: start,
      });
      return response;
    } catch (err) {
      console.error('Failed getting kline: ', err);
      return err;
    }
  }

  public async submitBatchOrder(
    symbol: string,
    price: number,
  ): Promise<SubmitBatchOrder> {
    try {
      console.log('submitting: ', symbol, price);
      const size = {
        twenty: Math.round(250 / +price),
        twentyFive: Math.round(500 / +price),
        thirty: Math.round(250 / +price),
      };
      const tickerDiscountPrice = {
        twenty: price - price * 0.2,
        twentyFive: price - price * 0.25,
        thirty: price - price * 0.3,
      };
      console.log('size: ', size);
      console.log('ticker discount: ', tickerDiscountPrice);
      const response = (await this.client.batchSubmitOrders('linear', [
        {
          symbol: symbol,
          side: 'Buy',
          orderType: 'Limit',
          qty: size.twenty.toString(),
          price: tickerDiscountPrice.twenty.toFixed(4).toString(),
          timeInForce: 'GTC',
        },
        {
          symbol: symbol,
          side: 'Buy',
          orderType: 'Limit',
          qty: size.twentyFive.toString(),
          price: tickerDiscountPrice.twentyFive.toFixed(4).toString(),
          timeInForce: 'GTC',
        },
        {
          symbol: symbol,
          side: 'Buy',
          orderType: 'Limit',
          qty: size.thirty.toString(),
          price: tickerDiscountPrice.thirty.toFixed(4).toString(),
          timeInForce: 'GTC',
        },
      ])) as SubmitBatchOrder;
      return response;
    } catch (err) {
      console.error('Failed submitting order: ', err);
      return err;
    }
  }

  public async cancelBatchOrder(
    symbol: string,
    orderId: string[],
  ): Promise<void> {
    try {
      orderId.map(async (id) => {
        const response = await this.client.batchCancelOrders('linear', [
          {
            symbol: symbol,
            orderId: id,
          },
        ]);
        console.log('cancel batch orders response: ', response);
      });
    } catch (err) {
      console.error('Failed cancelling batch orders');
      return err;
    }
  }
}

export default BybitOrder;
