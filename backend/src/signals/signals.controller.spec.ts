import { Test, TestingModule } from '@nestjs/testing';
import { SignalsController } from './signals.controller';
import { SignalsModule } from './signals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from './signal.schema';

describe('SignalsController', () => {
  let controller: SignalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SignalsModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
      ],
      controllers: [SignalsController],
    }).compile();

    controller = module.get<SignalsController>(SignalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all signals', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
  });
});