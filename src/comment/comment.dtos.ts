import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    @IsString()
    content: string;
}
