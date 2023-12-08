import { bybit } from './index.js';

let orderId = [];

const calculateStartTime = (): number => {
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const startTime = now - twentyFourHours;
  return startTime;
};

const renewOrder = async (ticker: string, price: number): Promise<void> => {
  try {
    if (orderId) {
      await bybit.cancelBatchOrder(ticker, orderId);
      orderId = [];
    }
    const submitBatchOrderResponse = await bybit.submitBatchOrder(
      ticker,
      price,
    );
    submitBatchOrderResponse.result.list.map((order) => {
      orderId.push(order.orderId);
    });
  } catch (err) {
    console.error('Error resetting orders: ', err);
    return err;
  }
};

export { calculateStartTime, renewOrder };
