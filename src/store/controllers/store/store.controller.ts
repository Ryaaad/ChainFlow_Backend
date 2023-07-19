/* eslint-disable prettier/prettier */
import { Body, Controller, Post,Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
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
    getStores(){
   return this.storeService.FindStores()
    }
    @Get('/:id')
    async getStore(@Param('id', ParseIntPipe) id: number){
        const store=  await this.storeService.FindStore(id)
   return store
    }
    @Put('/:id')
    async modifierStore(@Param('id', ParseIntPipe) id: number,@Body() updateStore:UpdateStoreDto ){
        try {
            await this.storeService.UpdateStore(id,updateStore)
            return { message: 'Store modifier successfully.' };
               } catch (error) {
               console.error('Error occurred while updating store:', error);
               return { error: 'An error occurred while deleting the store.'};
          }
         }
    @Delete('/:id')
    async deleteStore(@Param('id', ParseIntPipe) id: number){
         try {
      await this.storeService.DeleteStore(id);
      return { message: 'Store deleted successfully.' };
         } catch (error) {
         console.error('Error occurred while deleting store:', error);
         return { error: 'An error occurred while deleting the store.'};
    }
    }     
}
