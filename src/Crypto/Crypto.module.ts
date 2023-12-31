import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './Crypto.service';
import { Report } from '../DbRepository/Report/Report.entity';
import { CryptoController } from './Crypto.controller';
import { ReportCurrency } from '../DbRepository/ReportCurrency/ReportCurrency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, ReportCurrency])],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}
