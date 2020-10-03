import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('engine')
export class Engine {
    @PrimaryColumn()
    @Unique(["id"])
    id: number;

    @Column()
    position: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}