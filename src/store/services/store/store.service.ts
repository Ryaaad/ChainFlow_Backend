/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'entity/Store';
import { UpdateStoreDto } from 'src/store/dtos/UpdateStoreDto.dto';
import { CreateStoreDto } from 'src/store/dtos/createStoreDto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
 
    constructor(
        @InjectRepository(Store) private storeRepository: Repository<Store>,
      ) {}
    AddStore(StoreDetails: CreateStoreDto){
        const newStore = this.storeRepository.create(StoreDetails);
          return this.storeRepository.save(newStore);
    }
  async FindStores(){
    try {
        const stores = await this.storeRepository.find()
        if (stores) {
         return stores
        } else {
            throw new HttpException(
                'stores not found.',
                HttpStatus.BAD_REQUEST,
              );
        }
      } catch (error) {
        console.error('Error occurred while searching stores:', error);
        throw error;
      }
    }
   async FindStore(id:number){
        try {
            const store = await this.storeRepository.findOne({where: { id }})
            if (store) {
             return  store
            } else {
                throw new HttpException(
                    'store not found.',
                    HttpStatus.BAD_REQUEST,
                  );
            }
          } catch (error) {
            console.error('Error occurred while searching store:', error);
            throw error;
          }
    }
    async UpdateStore(id:number,StoreDetails:UpdateStoreDto){
        try {
            const store = await this.storeRepository.findOne({ where: { id } });
         
            if (store) {
             return   this.storeRepository.update({ id }, { ...StoreDetails});
            } else {
                throw new HttpException(
                    'store not found',
                    HttpStatus.BAD_REQUEST,
                  );
            }
          } catch (error) {
            console.error('Error occurred while updating store:', error);
            throw error;
          }
    }
    async DeleteStore(id:number){
        try {
            const store = await this.storeRepository.findOne({ where: { id } });
            if (store) {
             return  this.storeRepository.delete(id)
            } else {
                throw new HttpException(
                    'store not found. Cannot create Profile',
                    HttpStatus.BAD_REQUEST,
                  );
            }
          } catch (error) {
            console.error('Error occurred while deleting store:', error);
            throw error;
          }
    }
}
