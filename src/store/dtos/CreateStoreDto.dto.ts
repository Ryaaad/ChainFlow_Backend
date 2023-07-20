/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
export class CreateStoreDto { 
  @IsNotEmpty()  
  @IsString()
  StoreName: string;
  @IsNotEmpty()    
  @IsString()
  country: string;
} 