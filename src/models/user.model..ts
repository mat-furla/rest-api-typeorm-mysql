import * as argon2 from 'argon2';
import { IsNotEmpty, Length } from 'class-validator';
import {
    BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Unique(["username"])
    @Length(6, 255)
    username: string;

    @Column()
    @Length(6, 255)
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
        this.password = await argon2.hash(this.password, {type: argon2.argon2id});
    }

    async checkPassword(password: string) {
        return await argon2.verify(this.password, password);
    }
}