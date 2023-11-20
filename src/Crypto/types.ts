export type GetCurrencyDataInput = {
  currency: string;
  priceCurrency: string;
}[];

export type StatisticCurrencyObject = {
  [key: string]: {
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  };
};
