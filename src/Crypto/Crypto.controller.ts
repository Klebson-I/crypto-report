import {
  Controller,
  Post,
  UsePipes,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CryptoService } from './Crypto.service';
import { CurrencyArrayValidationPipe } from '../pipes/CreateCurrencyValidationPipe.pipe';
import { GetCurrencyDataInput } from './types';
import { DateTransformPipe } from '../pipes/DateTransformPipe';
import { CryptoParamValidationPipe } from '../pipes/CryptoParamValidationPipe';

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
  async createCurrencyReport(
    @Body('startDate', new DateTransformPipe()) startDate: Date,
    @Body('endDate', new DateTransformPipe()) endDate: Date,
    @Param('currencies', new CryptoParamValidationPipe()) currencies: string[],
  ) {
    return this.cryptoService.createCurrencyReport(
      startDate,
      endDate,
      currencies,
    );
  }

  @Get('/statistic/:currencies')
  async createStatisticCurrencyReport(
    @Body('startDate', new DateTransformPipe()) startDate: Date,
    @Body('endDate', new DateTransformPipe()) endDate: Date,
    @Param('currencies', new CryptoParamValidationPipe()) currencies: string[],
  ) {
    return this.cryptoService.createStatisticCurrencyReport(
      startDate,
      endDate,
      currencies,
    );
  }

  @Delete('/:path')
  async deleteCurrencyReport() {
    return this.cryptoService.deleteCurrencyReport();
  }
}
