import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { SignalsModule } from '../signals/signals.module'; // اطمینان از import

@Module({
  imports: [SignalsModule], // import SignalsModule
  providers: [RabbitmqService],
  controllers: [RabbitmqController],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}