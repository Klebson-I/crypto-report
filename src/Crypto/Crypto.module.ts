import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './Crypto.service';
import { Report } from '../DbRepository/Report/Report.entity';
import { CryptoController } from './Crypto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [CryptoService],
  controllers: [CryptoController],
  exports: [CryptoService],
})
export class CryptoModule {}
