import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { CryptoService } from './Crypto.service';
import { CurrencyArrayValidationPipe } from '../pipes/CreateCurrencyValidationPipe.pipe';
import { GetCurrencyDataInput } from './types';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Post('/createData')
  @UsePipes(new CurrencyArrayValidationPipe())
  async createReportsData(
    @Body('currencies') currencies: GetCurrencyDataInput,
  ) {
    return this.cryptoService.createReportData(currencies);
  }

  @Post('/report')
  async createCurrencyReport() {
    return this.cryptoService.createCurrencyReport();
  }
}
