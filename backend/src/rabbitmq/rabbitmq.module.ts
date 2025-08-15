import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { SignalsModule } from '../signals/signals.module'; // اضافه کردن این import
import { RabbitmqController } from './rabbitmq.controller';

@Module({
  imports: [SignalsModule], // اضافه کردن SignalsModule برای دسترسی به SignalsService
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  controllers: [RabbitmqController],
})
export class RabbitmqModule {}