import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'report' })
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  creation_date: Date;
}
