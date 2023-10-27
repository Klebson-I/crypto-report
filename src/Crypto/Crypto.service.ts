import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}
  async createReportData() {
    const entity = new Report();
    entity.id = v4();
    entity.start_date = new Date();
    entity.end_date = new Date();
    return this.reportRepository.insert(entity);
  }
  async findReportsInScope() {
    try {
      return this.reportRepository.find();
    } catch (e) {
      console.log(e);
    }
  }
}
