import { Exclude } from 'class-transformer';
import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    USER = 0,
    ADMIN = 1,
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ type: 'smallint', enum: UserRole, default: UserRole.USER })
    @Min(0)
    @Max(1)
    @Exclude()
    role: UserRole;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
