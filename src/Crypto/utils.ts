import { CoinApiHandler } from 'src/classes/CoinApiHandler/CoinApiHandler';

export const getCurrencyData = async () => {
  const coinApiHandler = new CoinApiHandler();
  const data = await coinApiHandler.getCurrencyValue('BTC', 'PLN');
  return data;
};
