import { join } from 'path';
import { JoinCurrencyDto } from '../ReportJoiner/types';
import { createArrayCsvWriter } from 'csv-writer';
import { v4 } from 'uuid';

export class CsvGenerator {
  constructor(private data: JoinCurrencyDto[]) {}

  async createStandardReport(): Promise<string> {
    if (!Array.isArray(this.data)) {
      return;
    }
    const rawData = <JoinCurrencyDto[]>this.data;
    const filename = v4();
    const path = join(__dirname, `../../../src/files/${filename}.csv`);
    const csvWriter = createArrayCsvWriter({
      path,
    });
    const titles = Object.keys(rawData[0]);
    const recordsValues = rawData.map((singleElem) =>
      Object.values(singleElem),
    );
    const records = [titles, ...recordsValues];
    await csvWriter.writeRecords(records);
    return path;
  }
}
