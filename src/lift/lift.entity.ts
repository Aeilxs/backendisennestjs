import { Max, Min } from 'class-validator';
import { Trail } from 'src/trail/trail.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

export enum LiftStatus {
    OFF = 0,
    ON = 1,
}

@Entity()
export class Lift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Trail, (trail) => trail.lifts, { cascade: true })
    @JoinTable()
    trails: Trail[];

    @Column({ type: 'smallint', enum: LiftStatus, default: LiftStatus.OFF })
    @Min(0)
    @Max(1)
    status: LiftStatus;
}
