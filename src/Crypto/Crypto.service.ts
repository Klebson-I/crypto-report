import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../DbRepository/Report/Report.entity';
import { Repository } from 'typeorm';
import { getCurrenciesStatisticInformation, getCurrencyData } from './utils';
import { ReportCurrency } from '../DbRepository/ReportCurrency/ReportCurrency.entity';
import { ReportRepositoryHandler } from '../classes/ReportRepositoryHandler/ReportRepositoryHandler';
import { ReportCurrencyRepositoryHandler } from '../classes/ReportCurrencyHandler/ReportCurrencyHandler';
import { GetCurrencyDataInput } from './types';
import { ReportJoiner } from '../classes/ReportJoiner/ReportJoiner';
import { CsvGenerator } from '../classes/CsvGenerator/CsvGenerator';
import { createReadStream } from 'fs';

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
    const currenciesData = await ReportJoiner.getDataFromScope(
      this.reportRepository,
      startDate,
      endDate,
      currencies,
    );
    const csvGenerator = new CsvGenerator(currenciesData);
    const reportFilePath = await csvGenerator.createStandardReport();
    const stream = createReadStream(reportFilePath);
    return new StreamableFile(stream);
  }

  async createStatisticCurrencyReport(
    startDate: Date,
    endDate: Date,
    currencies: string[],
  ) {
    const currenciesData = await ReportJoiner.getDataFromScope(
      this.reportRepository,
      startDate,
      endDate,
      currencies,
    );
    const statisticData = getCurrenciesStatisticInformation(currenciesData);
    console.log(statisticData);
  }

  async deleteCurrencyReport() {}
}
