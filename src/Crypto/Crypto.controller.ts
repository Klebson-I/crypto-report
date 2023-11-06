import { Controller, Post, UsePipes, Body, Get, Delete } from '@nestjs/common';
import { CryptoService } from './Crypto.service';
import { CurrencyArrayValidationPipe } from '../pipes/CreateCurrencyValidationPipe.pipe';
import { GetCurrencyDataInput } from './types';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Post('/')
  @UsePipes(new CurrencyArrayValidationPipe())
  async createReportsData(
    @Body('currencies') currencies: GetCurrencyDataInput,
  ) {
    return this.cryptoService.createReportData(currencies);
  }

  @Get('/:currencies')
  async createCurrencyReport() {
    return this.cryptoService.createCurrencyReport();
  }

  @Delete('/:path')
  async deleteCurrencyReport() {
    return this.cryptoService.deleteCurrencyReport();
  }
}
