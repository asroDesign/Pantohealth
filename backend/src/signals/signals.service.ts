import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal } from './signal.schema';

interface SignalRawData {
  [deviceId: string]: {
    data: any[];
    time: number;
  };
}

@Injectable()
export class SignalsService {
  constructor(@InjectModel(Signal.name) private signalModel: Model<Signal>) {}

  async processAndSaveSignal(rawData: SignalRawData): Promise<Signal> {
    const deviceId = Object.keys(rawData)[0];
    const { data, time } = rawData[deviceId];

    if (!deviceId || !time || !Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    const dataLength = data.length;
    const dataVolume = Buffer.from(JSON.stringify(data)).length; // اندازه در بایت

    return this.signalModel.create({
      deviceId,
      time,
      dataLength,
      dataVolume,
      data,
    });


  }

  async findAll(): Promise<Signal[]> {
    return this.signalModel.find().exec();
  }

  async findOne(id: string): Promise<Signal | null> {
    return this.signalModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Signal>): Promise<Signal | null> {
    return this.signalModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Signal | null> {
    return this.signalModel.findByIdAndDelete(id).exec();
  }

  async findWithFilter(query: { deviceId?: string; fromTime?: number }): Promise<Signal[]> {
    const filter: any = {};
    if (query.deviceId) filter.deviceId = query.deviceId;
    if (query.fromTime) filter.time = { $gte: query.fromTime };
    return this.signalModel.find(filter).exec();
  }
}