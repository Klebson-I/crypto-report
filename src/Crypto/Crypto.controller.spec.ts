import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './Crypto.controller';
import { CryptoService } from './Crypto.service';
import { CryptoModule } from './Crypto.module';

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

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CryptoModule],
    }).compile();

    cryptoController = app.get<CryptoController>(CryptoController);
    cryptoService = app.get<CryptoService>(CryptoService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const x = await cryptoController.createReportsData([]);
      expect(x).toBe(['1', '2']);
    });
  });
});
