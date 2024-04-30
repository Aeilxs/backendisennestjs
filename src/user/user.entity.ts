import { Exclude } from 'class-transformer';
import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    USER = 'ROLE_USER',
    ADMIN = 'ROLE_ADMIN',
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

    @Column({ enum: UserRole, default: UserRole.USER })
    @Exclude()
    role: UserRole;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
