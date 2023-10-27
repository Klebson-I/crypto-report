import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/DbRepository/Report/Report.entity';
import { CoinApiHandler } from 'src/classes/CoinApiHandler/CoinApiHandler';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { getCurrencyData } from './utils';
import { ReportCurrency } from 'src/DbRepository/ReportCurrency/ReportCurrency.entity';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private currencyRepository: Repository<ReportCurrency>,
  ) {}
  async createReportData() {
    const entity = new Report();
    entity.id = v4();
    entity.creation_date = new Date();
    const cryptoData = await getCurrencyData();
    const { asset_id_base, asset_id_quote, rate } = cryptoData;
    const currency = new ReportCurrency();
    currency.asset_id_base = asset_id_base;
    currency.asset_id_quote = asset_id_quote;
    currency.rate = rate;
    await this.currencyRepository.insert(currency);
    return 1;
  }
  async findReportsInScope() {
    try {
      return this.reportRepository.find();
    } catch (e) {
      console.log(e);
    }
  }
}
