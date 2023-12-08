import { RestClientV5, WebsocketClient } from 'bybit-api';
import dotenv from 'dotenv';

dotenv.config();

abstract class BybitClient {
  protected client: RestClientV5;
  protected wsClient: WebsocketClient;

  constructor() {
    this.client = new RestClientV5({
      key: process.env.API_KEY,
      secret: process.env.API_SECRET,
      enable_time_sync: true,
    });

    this.wsClient = new WebsocketClient({
      key: process.env.API_KEY,
      secret: process.env.API_SECRET,
      market: 'v5',
    });
  }
}

export default BybitClient;
