import { Max, Min } from 'class-validator';
import { Lift } from 'src/lift/lift.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TrailStatus, TrailDifficulty } from 'src/types';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class Trail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'smallint', enum: TrailStatus, default: TrailStatus.OFF })
    @Min(0)
    @Max(1)
    status: TrailStatus;

    @Column({ type: 'smallint', enum: TrailDifficulty, default: TrailDifficulty.GREEN })
    @Min(0)
    @Max(3)
    difficulty: TrailDifficulty;

    @ManyToMany(() => Lift, (lift) => lift.trails, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    lifts: Trail[];

    @OneToMany(() => Comment, (cmt) => cmt.trail, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    comments: Comment[];
}
