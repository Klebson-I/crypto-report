import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';
import { getCurrencyData } from './utils';
import { ReportCurrency } from 'src/DbRepository/ReportCurrency/ReportCurrency.entity';
import { ReportRepositoryHandler } from 'src/classes/ReportRepository/ReportRepository';
import { ReportCurrencyRepositoryHandler } from 'src/classes/ReportCurrency/ReportCurrencyHandler';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(ReportCurrency)
    private currencyRepository: Repository<ReportCurrency>,
  ) {}
  async createReportData() {
    const reportRepositoryHandler = new ReportRepositoryHandler(
      this.reportRepository,
    );
    const reportId = await reportRepositoryHandler.createReportEntity();
    const cryptoData = await getCurrencyData([
      {
        currency: 'BTC',
        priceCurrency: 'PLN',
      },
    ]);
    const currencyRepositoryHandler = new ReportCurrencyRepositoryHandler(
      this.currencyRepository,
    );
    const insertedIds =
      await currencyRepositoryHandler.createCurrenciesToReport(
        reportId,
        cryptoData,
      );
    return insertedIds;
  }
  async findReportsInScope() {
    try {
      return this.reportRepository.find();
    } catch (e) {
      console.log(e);
    }
  }
}
