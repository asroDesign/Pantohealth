import { Test, TestingModule } from '@nestjs/testing';
import { SignalsService } from './signals.service';
import { getModelToken } from '@nestjs/mongoose';
import { Signal } from './signal.schema';

describe('SignalsService', () => {
  let service: SignalsService;
  const mockSignalModel = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        { provide: getModelToken(Signal.name), useValue: mockSignalModel },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);
  });

  it('should process and save signal', async () => {
    const rawData = {};
    await service.processAndSaveSignal(rawData);
    expect(mockSignalModel.create).toHaveBeenCalled();
  });
});