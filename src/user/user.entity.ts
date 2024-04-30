import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'src/types';

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
    role: UserRole;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
