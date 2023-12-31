import axios from 'axios';
import { ApiCoinResponse } from './types';
export class CoinApiHandler {
  private apiKey = '1298CD37-D119-4CEA-8F69-51CF2BD92E4D';
  private url = 'https://rest.coinapi.io/v1/exchangerate/';
  private headers = {};
  constructor() {
    this.headers = {
      'X-CoinAPI-Key': this.apiKey,
      'Content-Type': 'application/json',
    };
  }
  async getCurrencyValue(crypto: string, priceCurrency: string) {
    const url = `${this.url}${crypto}/${priceCurrency}`;
    const res = (await axios({
      url,
      method: 'GET',
      headers: this.headers,
    })) as unknown as { data: ApiCoinResponse };
    const { data } = res;
    return data;
  }
}
