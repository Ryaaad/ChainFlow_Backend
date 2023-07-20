/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'entity/Store';
import { CreateStoreDto } from 'src/store/dtos/createStoreDto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
 
    constructor(
        @InjectRepository(Store) private storeRepository: Repository<Store>,
      ) {}
  async AddStore(StoreDetails: CreateStoreDto){
        try{
            const newStore = this.storeRepository.create(StoreDetails);
            const savedStore= await this.storeRepository.save(newStore);
            return savedStore
        }catch (error) {
            console.error('Error occurred while getting store:', error);
            throw new HttpException(
                'failed to get the store',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
          }
       
    }
  async FindStores(){
    try {
        const stores = await this.storeRepository.find()
        if(!stores){
            return null;
        }
        return stores
      } catch (error) {
        console.error('Error occurred while getting store:', error);
        throw new HttpException(
            'failed to get the store',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
   async FindStore(id:number):Promise<Store | null>{
        try {
            const store = await this.storeRepository.findOne({where: { id }})
            if(!store){
                return null;
            }
            return store
          } catch (error) {
            console.error('Error occurred while getting store:', error);
            throw new HttpException(
                'failed to get the store',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
          }
    }
    async UpdateStore(id:number,StoreDetails:Partial<Store>){
        try {
            const store = await this.storeRepository.findOne({ where: { id } });
            if (!store) return null;
            this.storeRepository.update({ id }, 
                { ...StoreDetails}); return store; 
           
          } catch (error) {
            console.error('Error occurred while updating store:', error);
            throw error;
          }
    }
    async DeleteStore(id:number){
        try {
            const store = await this.storeRepository.findOne({ where: { id } });
            if (store)  { this.storeRepository.delete(id); return store}
            return null
            
          } catch (error) {
            console.error('Error occurred while deleting store:', error);
            throw error;
          }
    }
}
