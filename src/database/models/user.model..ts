import { IsNotEmpty, Length } from 'class-validator';
import {
    BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from 'typeorm';

import * as bcrypt from "bcrypt";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Unique(["username"])
    @Length(6, 255, {message: 'Username must have at least 6 characters'})
    username: string;

    @Column()
    @Length(6, 255, {message: 'Password must have at least 6 characters'})
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password, 12);
    }

    async checkPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}