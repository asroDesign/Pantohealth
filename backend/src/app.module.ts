import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SignalsModule } from './signals/signals.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pantohealth'),
    RabbitmqModule,
    SignalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}