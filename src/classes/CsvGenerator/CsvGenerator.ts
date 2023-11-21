import { join } from 'path';
import { JoinCurrencyDto } from '../ReportJoiner/types';
import { createArrayCsvWriter } from 'csv-writer';
import { v4 } from 'uuid';
import { StatisticCurrencyObject } from '../../Crypto/types';

export class CsvGenerator {
  constructor(private data: JoinCurrencyDto[] | StatisticCurrencyObject) {}

  private getWriterWithPath() {
    const filename = v4();
    const path = join(__dirname, `../../../src/files/${filename}.csv`);
    const csvWriter = createArrayCsvWriter({
      path,
    });
    return { path, csvWriter };
  }

  async createStandardReport(): Promise<string> {
    if (!Array.isArray(this.data)) {
      return;
    }
    const rawData = <JoinCurrencyDto[]>this.data;
    const { path, csvWriter } = this.getWriterWithPath();
    const titles = Object.keys(rawData[0]);
    const recordsValues = rawData.map((singleElem) =>
      Object.values(singleElem),
    );
    const records = [titles, ...recordsValues];
    await csvWriter.writeRecords(records);
    return path;
  }

  async createStatisticReport(): Promise<string> {
    if (!Object.keys(this.data).length) {
      return;
    }
    const rawData = <StatisticCurrencyObject>this.data;
    const { path, csvWriter } = this.getWriterWithPath();
    const records = Object.entries(rawData).reduce((acc, curr) => {
      const [currName, value] = curr;
      const currTitle = [['Currency symbol'], [currName]];
      const fieldNames = Object.keys(value);
      const fieldValues = Object.values(value);
      acc = [...acc, ...currTitle, fieldNames, fieldValues];
      return acc;
    }, []);
    await csvWriter.writeRecords(records);
    return path;
  }
}
