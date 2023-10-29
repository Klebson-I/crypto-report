import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from './Crypto/Crypto.module';
import { Report } from './DbRepository/Report/Report.entity';
import { ReportCurrency } from './DbRepository/ReportCurrency/ReportCurrency.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'crypto_report',
      entities: [Report, ReportCurrency],
      synchronize: true,
    }),
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
