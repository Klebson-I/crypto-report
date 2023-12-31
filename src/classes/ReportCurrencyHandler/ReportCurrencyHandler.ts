import { ReportCurrency } from '../../DbRepository/ReportCurrency/ReportCurrency.entity';
import { Repository } from 'typeorm';
import { ApiCoinResponse } from '../CoinApiHandler/types';

export class ReportCurrencyRepositoryHandler {
  constructor(private repository: Repository<ReportCurrency>) {}

  async createCurrenciesToReport(
    reportId: number,
    currenciesData: ApiCoinResponse[],
  ) {
    const insertedIds = [];
    for await (const currencyData of currenciesData) {
      const { asset_id_base, asset_id_quote, rate } = currencyData;
      const entity = new ReportCurrency();
      entity.asset_id_base = asset_id_base;
      entity.asset_id_quote = asset_id_quote;
      entity.rate = rate;
      entity.report_id = reportId;
      const {
        raw: { insertId },
      } = await this.repository.insert(entity);
      insertedIds.push(insertId);
    }
    return insertedIds;
  }
}
