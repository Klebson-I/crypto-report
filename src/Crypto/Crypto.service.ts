import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';
import { getCurrencyData } from './utils';
import { ReportCurrency } from '../DbRepository/ReportCurrency/ReportCurrency.entity';
import { ReportRepositoryHandler } from '../classes/ReportRepositoryHandler/ReportRepositoryHandler';
import { ReportCurrencyRepositoryHandler } from '../classes/ReportCurrencyHandler/ReportCurrencyHandler';
import { GetCurrencyDataInput } from './types';
import { ReportJoiner } from 'src/classes/ReportJoiner/ReportJoiner';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(ReportCurrency)
    private currencyRepository: Repository<ReportCurrency>,
  ) {}
  async createReportData(currencies: GetCurrencyDataInput) {
    const reportRepositoryHandler = new ReportRepositoryHandler(
      this.reportRepository,
    );
    const reportId = await reportRepositoryHandler.createReportEntity();
    const cryptoData = await getCurrencyData(currencies);
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
  async createCurrencyReport(
    startDate: Date,
    endDate: Date,
    currencies: string[],
  ) {
    console.log(currencies);
    await ReportJoiner.getDataFromScope(
      this.reportRepository,
      startDate,
      endDate,
      currencies,
    );
  }
  async deleteCurrencyReport() {}
}
