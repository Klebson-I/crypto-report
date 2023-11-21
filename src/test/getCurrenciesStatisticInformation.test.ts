import { getCurrenciesStatisticInformation } from '../Crypto/utils';

const mockJoinData = [
  {
    report_id: 1,
    asset_id_base: 'BTC',
    rate: 10,
    asset_id_quote: 'PLN',
    creation_date: new Date('1-1-2000'),
  },
  {
    report_id: 2,
    asset_id_base: 'BTC',
    rate: 5,
    asset_id_quote: 'PLN',
    creation_date: new Date('1-1-2000'),
  },
  {
    report_id: 3,
    asset_id_base: 'ETH',
    rate: 12,
    asset_id_quote: 'PLN',
    creation_date: new Date('1-1-2000'),
  },
  {
    report_id: 4,
    asset_id_base: 'ETH',
    rate: 100,
    asset_id_quote: 'PLN',
    creation_date: new Date('1-1-2000'),
  },
];

describe('Test getCurrenciesStatisticInformation function', () => {
  it('Should', () => {
    const obj = getCurrenciesStatisticInformation(mockJoinData);
    expect(obj).toEqual({});
  });
});
