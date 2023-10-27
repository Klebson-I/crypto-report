import { Controller, Post } from '@nestjs/common';
import { CryptoService } from './Crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Post('/createData')
  async createReportsData() {
    return this.cryptoService.findReportsInScope();
  }
}
