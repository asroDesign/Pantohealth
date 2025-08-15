import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqModule } from './rabbitmq.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from '../signals/signal.schema';

describe('RabbitmqController', () => {
  let controller: RabbitmqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RabbitmqModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test'), // کانکشن تست موقت
        MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]), // ثبت مدل Signal
      ],
      controllers: [RabbitmqController],
    }).compile();

    controller = module.get<RabbitmqController>(RabbitmqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status', () => {
    const result = controller.getStatus();
    expect(result).toEqual({ status: 'RabbitMQ is running' });
  });

  it('should send to queue', () => {
    const mockData = { test: 'data' };
    const spy = jest.spyOn(controller['rabbitmqService'], 'sendToQueue').mockReturnValue(true);
    const result = controller.sendToQueue(mockData);
    expect(spy).toHaveBeenCalledWith(mockData);
    expect(result).toBe(true);
    spy.mockRestore();
  });
});