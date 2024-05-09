import { Trail } from 'src/trail/trail.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (u) => u.comments)
    user: User;

    @Column()
    content: string;

    @ManyToMany(() => Trail, (t) => t.comments)
    @JoinTable()
    trails: Trail[];
}
