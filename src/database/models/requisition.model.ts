import { IsNotEmpty } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { Employee } from './employee.model';

@Entity('requisitions')
export class Requisition {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Employee, requisitions => Requisition, {eager: true})
    employee: Employee;

    @Column()
    @IsNotEmpty()
    id_key: number;

    @Column()
    @IsNotEmpty()
    action: boolean;

    @Column()
    @IsNotEmpty()
    confirmed: boolean;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}