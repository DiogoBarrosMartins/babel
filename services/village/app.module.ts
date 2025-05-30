import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { join } from 'path';
import { KafkaController } from './kafka/kafka.controller';
import { VillageModule } from './modules/village/village.module';
import { KafkaModule } from '../../libs/kafka/kafka.module';
import { BullModule } from '@nestjs/bull';
import { TrainingModule } from './modules/training/training.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: { host: 'redis', port: 6379 },
    }),

    ConfigModule.forRoot({
      envFilePath: join(__dirname, '.env'),
      isGlobal: true,
    }),
    KafkaModule,
    VillageModule,
    TrainingModule,
  ],
  providers: [AppService],
  controllers: [AppController, KafkaController],
  exports: [AppService],
})
export class AppModule {}
