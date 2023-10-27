import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './DbRepository/Report/Report.entity';
import { CryptoController } from './Crypto/Crypto.controller';
import { CryptoService } from './Crypto/Crypto.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'crypto_report',
      entities: [Report],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CryptoController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
