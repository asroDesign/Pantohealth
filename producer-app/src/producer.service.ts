import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class ProducerService implements OnModuleInit {
  private channel: Channel;

  async onModuleInit() {
    const connection = await connect('amqp://localhost:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('x-ray-queue', { durable: false });
    console.log('Producer connected');
    await this.sendSampleData(); // ارسال نمونه برای تست

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
}