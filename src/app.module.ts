/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { StoreModule } from './store/store.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "entity/Store";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yayakong',
      database: 'ChainFlow',
      entities: [Store],
      synchronize: true,
    }),
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
