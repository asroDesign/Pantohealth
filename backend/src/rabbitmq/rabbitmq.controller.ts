import { Body, Controller, Post } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitmqController {
    constructor(private rabitService: RabbitmqService) { }

    @Post()
    sendToQueue(@Body() Body) {
        return this.rabitService.sendToQueue(Body);
    }
}