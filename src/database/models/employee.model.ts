import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Index
} from 'typeorm';

import { Requisition } from './requisition.model';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(type => Requisition, employee => Employee)
    requisitions: Requisition[];

    @Column()
    name: string;

    @Column()
    sector: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}