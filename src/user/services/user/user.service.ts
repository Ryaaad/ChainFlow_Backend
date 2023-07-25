/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/User';
import { CreateUserDto } from 'src/user/dtos/CreateUserDto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    async post(usetDetails: CreateUserDto){
          try{
              const newuser = this.userRepository.create(usetDetails);
              const saveduser= await this.userRepository.save(newuser);
              return saveduser
          }catch (error) {
              console.error('Error occurred while getting store:', error);
              throw new HttpException(
                  'failed to get the store',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
         
      }
    async getall(){
        try{
            const users = await this.userRepository.find()
            return users
        }catch (error) {
            console.error('Error occurred while getting store:', error);
            throw new HttpException(
                'failed to get the store',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
          }
       
    }
    async get(id:number):Promise<User | null>{
        try {
        const user=await this.userRepository.findOne({where:{id}})
        if(!user) return null 
        return user }
        catch (error) {
            console.error('Error occurred while getting user:', error);
            throw new HttpException(
                'failed to get the user',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
          }
    }
   async put(id:number,userDetails: Partial<User>){
        try {
            let user=await this.userRepository.findOne({where:{id}})
            console.log(user)
           if(!user) return null 
           user = Object.assign(user,userDetails)
          const UpdatedUser= await this.userRepository.save(user)
           return UpdatedUser
        }
            catch (error) {
                console.error('Error occurred while updating user:', error);
                throw new HttpException(
                    'failed to update the user',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  );
              }
    }
    async delete(id:number){
        try {
            const user=await this.userRepository.findOne({where:{id}})
            console.log(user)
           if(!user) return null 
          await this.userRepository.delete(user)
           return user
        } catch (error) {
            console.error('Error occurred while updating user:', error);
            throw new HttpException(
                'failed to update the user',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }
}
