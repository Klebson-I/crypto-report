import axios from 'axios';
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
    this.url += `${crypto}/${priceCurrency}`;
    const res = (await axios({
      url: this.url,
      method: 'GET',
      headers: this.headers,
    })) as unknown as { data: any };
    const { data } = res;
    return data;
  }
}
