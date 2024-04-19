import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { TrailDifficulty, TrailStatus } from './trail.entity';

export class CreateTrailDto {
    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Le statut doit être compris entre 0 et 1' })
    @Max(1, { message: 'Le statut doit être compris entre 0 et 1' })
    status: TrailStatus;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'La difficultée doit être comprise entre 0 et 3' })
    @Max(3, { message: 'La difficultée doit être comprise entre 0 et 3' })
    difficulty: TrailDifficulty;
}

export class UpdateTrailDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Le statut doit être compris entre 0 et 1' })
    @Max(1, { message: 'Le statut doit être compris entre 0 et 1' })
    status: TrailStatus;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'La difficultée doit être comprise entre 0 et 3' })
    @Max(3, { message: 'La difficultée doit être comprise entre 0 et 3' })
    difficulty: TrailDifficulty;
}
