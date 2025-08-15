import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqService } from './rabbitmq.service';
import { SignalsModule } from '../signals/signals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from '../signals/signal.schema';

describe('RabbitmqService', () => {
  let service: RabbitmqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SignalsModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
      ],
      providers: [RabbitmqService],
    }).compile();

    service = module.get<RabbitmqService>(RabbitmqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to RabbitMQ', async () => {
    const spy = jest.spyOn(require('amqplib'), 'connect').mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue({
        assertQueue: jest.fn().mockResolvedValue(true),
        consume: jest.fn(),
      }),
    });
    await service.onModuleInit();
    expect(spy).toHaveBeenCalledWith('amqp://localhost:5672');
    spy.mockRestore();
  });
});