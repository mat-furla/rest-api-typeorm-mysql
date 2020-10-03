import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('keys')
export class Key {
    @PrimaryColumn()
    @Unique(["id"])
    id: string;

    @Column()
    available: boolean;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}