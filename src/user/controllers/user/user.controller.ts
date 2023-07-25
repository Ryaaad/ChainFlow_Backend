/* eslint-disable prettier/prettier */
import { Body, Controller, Post,Get, NotFoundException, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { User } from 'entity/User';
import { CreateUserDto } from 'src/user/dtos/CreateUserDto.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}

    @Post()
    createUser(@Body() createNewUser:CreateUserDto){
       this.userService.post(createNewUser)
       return {  message:"User Created",status:201 }
    }
    @Get()
    GetUsers(){
            const users=this.userService.getall()
            if(users) return users
            return new NotFoundException('users not found.');
    }
    @Get('/:id')
    async GetUser(@Param('id', ParseIntPipe) id:number ){
            const user=await this.userService.get(id)
            if(user!=null) return user
            return new NotFoundException('user not found.');
    }
    @Put('/:id')
   async UpdateUser(@Param('id',ParseIntPipe) id:number,@Body() updateUser:Partial<User> ){
       const updateduser =await this.userService.put(id,updateUser)
      if(!updateduser)  return new NotFoundException('user not found.');
      return updateduser
    }
    @Delete('/:id')
    async DeleteUser(@Param('id',ParseIntPipe) id:number){
        const DeletedUser= await this.userService.delete(id)
        if(DeletedUser) return DeletedUser 
        return new NotFoundException('user not found.');
    }
}
