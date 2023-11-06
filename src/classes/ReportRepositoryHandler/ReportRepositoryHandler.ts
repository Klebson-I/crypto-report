import { Report } from 'src/DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';

export class ReportRepositoryHandler {
  constructor(private reportRepository: Repository<Report>) {}
  async createReportEntity() {
    const entity = new Report();
    entity.creation_date = new Date();
    const results = await this.reportRepository.insert(entity);
    const {
      raw: { insertId },
    } = results;
    return insertId;
  }
}
