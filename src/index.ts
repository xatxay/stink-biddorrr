import BybitOrder from './bybitOrder.js';
import { calculateStartTime, renewOrder } from './utils.js';

export const bybit = new BybitOrder();

const main = async (): Promise<void> => {
  const symbol = ['BEAMUSDT', 'TIAUSDT', 'CFXUSDT'];
  symbol.map(async (ticker) => {
    console.log('ticker: ', ticker);
    const startTime = calculateStartTime();
    const getPriceResponse = await bybit.getPrice(ticker, startTime);
    console.log('price: ', getPriceResponse.result.list);
    const price = Number(getPriceResponse.result.list[0][2]);
    await renewOrder(ticker, price);
  });
};

await main();

setInterval(main, 24 * 60 * 60 * 1000);
