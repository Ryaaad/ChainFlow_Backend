/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StoreController } from './controllers/store/store.controller';
import { StoreService } from './services/store/store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'entity/Store';

@Module({
  imports:[TypeOrmModule.forFeature([Store])],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
