/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {   
    @IsEmail()
    email: string;
    @IsNotEmpty()    
    @IsString()
    FirstName: string;
    @IsNotEmpty()    
    @IsString()
    Role: string;
    @IsNotEmpty()    
    @IsString()
    LastName: string;
    @IsNotEmpty()    
    @IsString()
    HashedP: string;
  } 