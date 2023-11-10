import { Report } from 'src/DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';
import { JoinCurrencyDto } from './types';

export class ReportJoiner {
  static async getDataFromScope(
    reportRepository: Repository<Report>,
    startDate: Date,
    endDate: Date,
    currencies: string[],
  ): Promise<JoinCurrencyDto[]> {
    const placeholders = currencies.map(() => '?').join(',');
    const query = `
    SELECT
      report_currency.report_id,
      report_currency.asset_id_base,
      report_currency.rate,
      report_currency.asset_id_quote
    FROM
      report
    JOIN
      report_currency ON report.id = report_currency.report_id
    WHERE
      report.creation_date BETWEEN ? AND ?
      AND report_currency.asset_id_base IN (${placeholders})
    `;
    const queryParams = [startDate, endDate, ...currencies];
    const result = (await reportRepository.query(
      query,
      queryParams,
    )) as JoinCurrencyDto[];
    return result;
  }
}
