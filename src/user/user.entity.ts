import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from 'src/types';
import { Comment } from 'src/comment/comment.entity';

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

    @OneToMany(() => Comment, (cmt) => cmt.user)
    comments: Comment[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
