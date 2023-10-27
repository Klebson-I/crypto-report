import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'report' })
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}
