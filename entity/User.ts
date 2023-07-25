/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Unique
  } from 'typeorm';
  
  @Entity({ name: 'users' })
  export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column(Unique)
    email: string;
    @Column()
    FirstName: string;
    @Column()
    Role: string;
    @Column()
    LastName: string;
    @Column()
    HashedP: string;
  }