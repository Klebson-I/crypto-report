import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}
  async createReportData() {
    // return this.reportRepository.insert()
  }
  async findReportsInScope() {
    try {
      return this.reportRepository.find();
    } catch (e) {
      console.log(e);
    }
  }
}
