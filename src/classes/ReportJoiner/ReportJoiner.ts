import { Report } from 'src/DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';

export class ReportJoiner {
  static async getDataFromScope(
    reportRepository: Repository<Report>,
    startDate: Date,
    endDate: Date,
  ) {
    const result = await reportRepository.query(
      'SELECT `report_currency`.report_id, `report_currency`.asset_id_base, `report_currency`.rate, `report_currency`.asset_id_quote FROM `report` JOIN `report_currency` ON `report`.id = `report_currency`.report_id  WHERE `report`.creation_date BETWEEN ? AND ?',
      [startDate, endDate],
    );
    console.log(result);
  }
}
