/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
export class CreateStoreDto { 
  @IsNotEmpty()  
  StoreName: string;
  @IsNotEmpty()    
  country: string;
} 