/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'stores' })
  export class Store {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    StoreName: string;
  
    @Column()
    country: string;
  }