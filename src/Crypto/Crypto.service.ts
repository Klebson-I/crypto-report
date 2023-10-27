import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/DbRepository/Report/Report.entity';
import { CoinApiHandler } from 'src/classes/CoinApiHandler/CoinApiHandler';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { getCurrencyData } from './utils';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}
  async createReportData() {
    const entity = new Report();
    entity.id = v4();
    entity.creation_date = new Date();
    const cryptoData = await getCurrencyData();
    const { asset_id_base, asset_id_quote, rate } = cryptoData;
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
