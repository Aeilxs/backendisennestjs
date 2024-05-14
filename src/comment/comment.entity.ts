import { Trail } from 'src/trail/trail.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (u) => u.comments)
    user: User;

    @Column()
    content: string;

    @ManyToOne(() => Trail, (t) => t.comments)
    @JoinTable()
    trail: Trail;
}
