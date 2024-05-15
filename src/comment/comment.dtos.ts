import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'Le commentaire ne doit pas être vide' })
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    trailId: number;
}

export class UpdateCommentDto {
    @IsNotEmpty({ message: 'Le commentaire ne doit pas être vide' })
    @IsString()
    content: string;
}
