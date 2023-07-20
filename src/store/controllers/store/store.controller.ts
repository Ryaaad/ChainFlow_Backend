/* eslint-disable prettier/prettier */
import { Body, Controller, Post,Get, Param, ParseIntPipe, Put, Delete, NotFoundException } from '@nestjs/common';
import { UpdateStoreDto } from 'src/store/dtos/UpdateStoreDto.dto';
import { CreateStoreDto } from 'src/store/dtos/createStoreDto.dto';
import { StoreService } from 'src/store/services/store/store.service';

@Controller('store')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post()
    createStore(@Body() createNewStore:CreateStoreDto ){
        this.storeService.AddStore(createNewStore)
    }
    @Get()
   async getStores(){
        const stores= await this.storeService.FindStores()
        if(stores) return stores 
        return  {message: 'No Store Found'};
    }
    @Get('/:id')
    async getStore(@Param('id', ParseIntPipe) id: number){
        const store=  await this.storeService.FindStore(id)
        if(store!=null)  return store
        else return new NotFoundException('Store not found.');
    }
    @Put('/:id')
    async modifierStore(@Param('id', ParseIntPipe) id: number,@Body() updateStore:UpdateStoreDto ){
        try {
           const store= await this.storeService.UpdateStore(id,updateStore)
           console.log(store);
           
           if(store!=null) return { message: 'Store modifier successfully.' };
          return new NotFoundException('Store not found.');
               } catch (error) {
               console.error('Error occurred while updating store:', error);
               return { error: 'An error occurred while updating the store.'};
          }
         }
    @Delete('/:id')
    async deleteStore(@Param('id', ParseIntPipe) id: number){
         try {
        const store= await this.storeService.DeleteStore(id);
        if(store) return { message: 'Store deleted successfully.' };
        else return new NotFoundException('Store not found.');
         } catch (error) {
         console.error('Error occurred while deleting store:', error);
         return { error: 'An error occurred while deleting the store.'};
    }
    }     
}
