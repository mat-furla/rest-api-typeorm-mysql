import { IsNotEmpty, Length } from 'class-validator';
import {
    BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from 'typeorm';

import bcrypt from 'bcryptjs';

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
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}