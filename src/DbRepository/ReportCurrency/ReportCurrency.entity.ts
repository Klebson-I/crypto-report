import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'report_currency' })
export class ReportCurrency {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  asset_id_base: string;

  @Column()
  asset_id_quote: string;

  @Column()
  rate: number;
}
