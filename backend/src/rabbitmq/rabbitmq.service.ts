import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';
import { SignalsService } from '../signals/signals.service'; // بعداً import می‌شود

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private connection: Connection;
  private channel: Channel;

  constructor(private signalsService: SignalsService) {} // inject SignalsService

  async onModuleInit() {
    await this.connect();
    await this.consume();
  }

  private async connect() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('x-ray-queue', { durable: false });
    console.log('RabbitMQ connected and queue asserted');
  }

  private async consume() {
    await this.channel.consume('x-ray-queue', async (msg) => {
      if (msg) {
        try {
          const rawData = JSON.parse(msg.content.toString());
          await this.signalsService.processAndSaveSignal(rawData);
          this.channel.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          // Optional: nack for retry
          this.channel.nack(msg, false, true);
        }
      }
    });
    console.log('Consuming from x-ray-queue');
  }

  // متد برای ارسال پیام (برای تست اختیاری)
  async sendToQueue(data: any) {
    this.channel.sendToQueue('x-ray-queue', Buffer.from(JSON.stringify(data)));
  }
}