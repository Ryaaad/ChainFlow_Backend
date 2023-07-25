/* eslint-disable prettier/prettier */
import { Body, Controller, Post,Get, Param, ParseIntPipe, Put, Delete, NotFoundException } from '@nestjs/common';
import { Store } from 'entity/Store';
import { CreateStoreDto } from 'src/store/dtos/createStoreDto.dto';
import { StoreService } from 'src/store/services/store/store.service';

@Controller('store')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post()
    createStore(@Body() createNewStore:CreateStoreDto ){
        this.storeService.post(createNewStore)
    }
    @Get()
   async getStores(){
        const stores= await this.storeService.getAll()
        if(stores) return stores 
        return  {message: 'No Store Found'};
    }
    @Get('/:id')
    async getStore(@Param('id', ParseIntPipe) id: number){
        const store=  await this.storeService.get(id)
        if(store!=null)  return store
        return new NotFoundException('Store not found.');
    }
    @Put('/:id')
    async modifierStore(@Param('id', ParseIntPipe) id: number,@Body() updateStore:Partial<Store> ){
        try {
           const store= await this.storeService.put(id,updateStore)
           console.log(store);
           
           if(store!=null) return store;
          return new NotFoundException('Store not found.');
               } catch (error) {
               console.error('Error occurred while updating store:', error);
               return { error: 'An error occurred while updating the store.'};
          }
         }
    @Delete('/:id')
    async deleteStore(@Param('id', ParseIntPipe) id: number){
         try {
        const store= await this.storeService.delete(id);
        if(store) return { message: 'Store deleted successfully.' };
        else return new NotFoundException('Store not found.');
         } catch (error) {
         console.error('Error occurred while deleting store:', error);
         return { error: 'An error occurred while deleting the store.'};
    }
    }     
}
