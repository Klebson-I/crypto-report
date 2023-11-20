import { JoinCurrencyDto } from '../classes/ReportJoiner/types';
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

const getRates = (a) => a.map(({ rate }) => rate);

const getAverageValue = (reports: JoinCurrencyDto[]): number => {
  const prices = getRates(reports);
  const sum = prices.reduce((acc, curr) => (acc += curr), 0);
  const avg = sum / prices.length;
  return avg;
};

const getMaxValue = (reports: JoinCurrencyDto[]): number => {
  const prices = getRates(reports);
  const max = Math.max(...prices);
  return max;
};

const getMinValue = (reports: JoinCurrencyDto[]): number => {
  const prices = getRates(reports);
  const min = Math.min(...prices);
  return min;
};

export const getCurrenciesStatisticInformation = (data: JoinCurrencyDto[]) => {
  const specificCurrenciesInformation = data.reduce((acc, curr, _, arr) => {
    const { asset_id_base: actualIdBase } = curr;

    if (acc.hasOwnProperty(actualIdBase)) {
      return acc;
    }

    const allReportsInType = arr.filter(
      ({ asset_id_base }) => asset_id_base === actualIdBase,
    );

    const avgValue = getAverageValue(allReportsInType);
    const maxValue = getMaxValue(allReportsInType);
    const minValue = getMinValue(allReportsInType);

    acc[actualIdBase] = {
      averagePrive: avgValue,
      maxPrice: maxValue,
      minPrice: minValue,
    };

    return acc;
  }, {});
  return specificCurrenciesInformation;
};
