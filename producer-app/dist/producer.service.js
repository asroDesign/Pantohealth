"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerService = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
let ProducerService = class ProducerService {
    channel;
    async onModuleInit() {
        const connection = await (0, amqplib_1.connect)('amqp://localhost:5672');
        this.channel = await connection.createChannel();
        await this.channel.assertQueue('x-ray-queue', { durable: false });
        console.log('Producer connected');
        await this.sendSampleData();
        await this.channel.close();
        await connection.close();
    }
    async sendSampleData() {
        const sampleData = {
            "66bb584d4ae73e488c30a072": {
                "data": [
                    [762, [51.339764, 12.339223833333334, 1.2038000000000002]],
                    [1766, [51.33977733333333, 12.339211833333334, 1.531604]],
                    [2763, [51.339782, 12.339196166666667, 2.13906]]
                ],
                "time": 1735683480000
            }
        };
        this.channel.sendToQueue('x-ray-queue', Buffer.from(JSON.stringify(sampleData)));
        console.log('Sample data sent');
    }
};
exports.ProducerService = ProducerService;
exports.ProducerService = ProducerService = __decorate([
    (0, common_1.Injectable)()
], ProducerService);
//# sourceMappingURL=producer.service.js.map