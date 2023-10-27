import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from './Crypto.service';
import { Report } from '../DbRepository/Report/Report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [CryptoService],
})
export class CryptoModule {}
