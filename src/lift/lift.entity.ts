import { Max, Min } from 'class-validator';
import { Trail } from 'src/trail/trail.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { LiftStatus } from 'src/types';

@Entity()
export class Lift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'smallint', enum: LiftStatus, default: LiftStatus.OFF })
    @Min(0)
    @Max(1)
    status: LiftStatus;

    @ManyToMany(() => Trail, (trail) => trail.lifts)
    @JoinTable()
    trails: Trail[];
}
