import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserRole } from 'src/types';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Le prénom ne doit pas être vide' })
    firstname: string;

    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    lastname: string;

    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    password: string;

    @IsEmail()
    email: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Le prénom ne doit pas être vide' })
    firstname: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
    lastname: string;

    @IsOptional()
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    password: string;

    @IsOptional()
    @IsEnum(UserRole, { message: "Doit respecter le format 'ROLE_USER' | 'ROLE_ADMIN'" })
    role: UserRole;
}
