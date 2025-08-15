import { OnModuleInit } from '@nestjs/common';
export declare class ProducerService implements OnModuleInit {
    private channel;
    onModuleInit(): Promise<void>;
    sendSampleData(): Promise<void>;
}
