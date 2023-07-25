/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'entity/Store';
import { User } from 'entity/User';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
    imports:[TypeOrmModule.forFeature([Store,User])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
