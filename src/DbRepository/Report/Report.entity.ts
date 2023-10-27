import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'report' })
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  creation_date: Date;
}
