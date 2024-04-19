import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Le prénom ne doit pas être vide' })
    readonly firstname: string;

    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    readonly lastname: string;

    @MinLength(8, { message: 'Le moit de passe doit contenir au moins 8 caractères' })
    readonly password: string;

    @IsEmail()
    readonly email: string;
}

export class UpdateUserDto {
    @IsNotEmpty({ message: 'Le prénom ne doit pas être vide' })
    readonly firstname: string;

    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    readonly lastname: string;
}
