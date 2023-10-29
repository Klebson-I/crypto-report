import { CoinApiHandler } from 'src/classes/CoinApiHandler/CoinApiHandler';
import { GetCurrencyDataInput } from './types';

export const getCurrencyData = async (currencies: GetCurrencyDataInput) => {
  const coinApiHandler = new CoinApiHandler();
  const promiseArray = currencies.map(({ currency, priceCurrency }) =>
    coinApiHandler.getCurrencyValue(currency, priceCurrency),
  );
  const data = await Promise.all(promiseArray);
  return data;
};
