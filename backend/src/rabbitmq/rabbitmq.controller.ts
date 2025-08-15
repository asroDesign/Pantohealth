import { Controller, Get, Post, Body } from '@nestjs/common'; // اضافه کردن Post
import { RabbitmqService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitmqController {
  constructor(private rabbitmqService: RabbitmqService) {}

  @Get()
  getStatus() {
    return { status: 'RabbitMQ is running' };
  }

  @Post()
  sendToQueue(@Body() body: any) {
    return this.rabbitmqService.sendToQueue(body);
  }
}