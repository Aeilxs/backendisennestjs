import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { LiftStatus } from './lift.entity';

export class CreateLiftDto {
    @IsNotEmpty()
    name: string;
}

export class UpdateLiftDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsNumber()
    idTrail: number;

    @IsNumber()
    @Min(0, { message: 'Le statut doit être compris entre 0 et 1' })
    @Max(1, { message: 'Le statut doit être compris entre 0 et 1' })
    status: LiftStatus;
}
