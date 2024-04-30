import { Max, Min } from 'class-validator';
import { Lift } from 'src/lift/lift.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

export enum TrailStatus {
    OFF = 0,
    ON = 1,
}

export enum TrailDifficulty {
    GREEN = 0,
    BLUE = 1,
    RED = 2,
    BLACK = 3,
}

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

    @ManyToMany(() => Lift, (lift) => lift.trails)
    @JoinTable()
    lifts: Trail[];
}
