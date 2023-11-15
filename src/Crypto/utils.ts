import { JoinCurrencyDto } from 'src/classes/ReportJoiner/types';
import { CoinApiHandler } from '../classes/CoinApiHandler/CoinApiHandler';
import { GetCurrencyDataInput } from './types';

export const getCurrencyData = async (currencies: GetCurrencyDataInput) => {
  const coinApiHandler = new CoinApiHandler();
  const promiseArray = currencies.map(({ currency, priceCurrency }) =>
    coinApiHandler.getCurrencyValue(currency, priceCurrency),
  );
  const data = await Promise.all(promiseArray);
  return data;
};

export const getCurrenciesStatisticInformation = (data: JoinCurrencyDto[]) => {
  console.log(data);
};
