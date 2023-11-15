export interface JoinCurrencyDto {
  report_id: number;
  asset_id_base: string;
  rate: number;
  asset_id_quote: string;
  creation_date: Date;
}
