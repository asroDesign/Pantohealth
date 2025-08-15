import { Test, TestingModule } from '@nestjs/testing';
import { SignalsService } from './signals.service';
import { getModelToken } from '@nestjs/mongoose';
import { Signal } from './signal.schema';

describe('SignalsService', () => {
  let service: SignalsService;
  let model: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        {
          provide: getModelToken(Signal.name),
          useValue: {
            // شبیه‌سازی مستقیم new با استفاده از create
            create: jest.fn().mockImplementation((data) => ({
              save: jest.fn().mockResolvedValue({
                ...data,
                _id: 'testId', // شبیه‌سازی _id برای سازگاری با Mongoose
                __v: 0,
              }),
            })),
            // متدهای دیگر
            save: jest.fn().mockResolvedValue({ deviceId: 'test', time: 123, _id: 'testId', __v: 0 }),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([{ deviceId: 'test', time: 123, _id: 'testId', __v: 0 }]),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ deviceId: 'test', time: 123, _id: 'testId', __v: 0 }),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ deviceId: 'test', time: 123, _id: 'testId', __v: 0 }),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ deviceId: 'test', time: 123, _id: 'testId', __v: 0 }),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);
    model = module.get(getModelToken(Signal.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process and save a signal', async () => {
    const rawData = {
      '66bb584d4ae73e488c30a072': {
        data: [[762, [51.339764, 12.339223833333334, 1.2038000000000002]]],
        time: 1735683480000,
      },
    };
    const deviceId = Object.keys(rawData)[0];
    const { data, time } = rawData[deviceId];
    const dataLength = data.length;
    const dataVolume = Buffer.from(JSON.stringify(data)).length;

    // بازنویسی متد processAndSaveSignal برای استفاده از create به‌جای new
    const spy = jest.spyOn(model, 'create').mockResolvedValue({
      deviceId,
      time,
      dataLength,
      dataVolume,
      data,
      _id: 'testId',
      __v: 0,
      save: jest.fn().mockResolvedValue({
        deviceId,
        time,
        dataLength,
        dataVolume,
        data,
        _id: 'testId',
        __v: 0,
      }),
    });

    const result = await service.processAndSaveSignal(rawData);
    expect(result).toBeDefined();
    expect(spy).toHaveBeenCalledWith({
      deviceId,
      time,
      dataLength,
      dataVolume,
      data,
    });
    expect(result).toMatchObject({
      deviceId,
      time,
      dataLength,
      dataVolume,
      data,
      _id: 'testId',
      __v: 0,
    });
  });

  it('should find all signals', async () => {
    const signals = await service.findAll();
    expect(signals).toBeDefined();
    expect(signals.length).toBeGreaterThan(0);
    expect(model.find).toHaveBeenCalled();
  });

  it('should find one signal by id', async () => {
    const signal = await service.findOne('testId');
    expect(signal).toBeDefined();
    expect(model.findById).toHaveBeenCalledWith('testId');
  });

  it('should update a signal', async () => {
    const updateData = { dataLength: 10 };
    const signal = await service.update('testId', updateData);
    expect(signal).toBeDefined();
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('testId', updateData, { new: true });
  });

  it('should delete a signal', async () => {
    const signal = await service.delete('testId');
    expect(signal).toBeDefined();
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('testId');
  });

  it('should filter signals', async () => {
    const signals = await service.findWithFilter({ deviceId: 'test' });
    expect(signals).toBeDefined();
    expect(model.find).toHaveBeenCalledWith({ deviceId: 'test' });
  });
});