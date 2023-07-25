/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { StoreModule } from './store/store.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "entity/Store";
import { User } from "entity/User";
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yayakong',
      database: 'ChainFlow',
      entities: [Store,User],
      synchronize: true,
    }),
    StoreModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
