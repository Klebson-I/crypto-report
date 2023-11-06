import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './Crypto.controller';
import { CryptoService } from './Crypto.service';
import { ReportCurrency } from '../DbRepository/ReportCurrency/ReportCurrency.entity';
import { Report } from '../DbRepository/Report/Report.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('../classes/ReportCurrencyHandler/ReportCurrencyHandler', () => ({
  ReportCurrencyRepositoryHandler: class {
    async createCurrenciesToReport() {
      return ['1', '2'];
    }
  },
}));

jest.mock('./utils', () => ({
  getCurrencyData: () => {},
}));

jest.mock('../classes/ReportRepositoryHandler/ReportRepositoryHandler', () => ({
  ReportRepositoryHandler: class {
    async createReportEntity() {
      return 'report-1';
    }
  },
}));

describe('Crypto controller', () => {
  let cryptoController: CryptoController;
  let cryptoService: CryptoService;

  const reportRepository = {
    find: jest.fn(),
  };
  const reportCurrencyRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        { provide: getRepositoryToken(Report), useValue: reportRepository },
        {
          provide: getRepositoryToken(ReportCurrency),
          useValue: reportCurrencyRepository,
        },
      ],
      controllers: [CryptoController],
    }).compile();

    cryptoController = app.get<CryptoController>(CryptoController);
    cryptoService = app.get<CryptoService>(CryptoService);
  });

  describe('root', () => {
    it('Should return array of inserted ids returned from ReportCurrencyRepositoryHandler class', async () => {
      const result = await cryptoController.createReportsData([]);
      expect(result).toEqual(['1', '2']);
    });
  });
});
