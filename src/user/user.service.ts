import * as bcrypt from 'bcrypt';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRole } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dtos';
import { BCRYPT_ROUNDS, JwtPayload } from 'src/constants';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    findOne(email: string): Promise<User | null> {
        return this.userRepo.findOneBy({ email });
    }

    async create(dto: CreateUserDto): Promise<CreateUserDto & User> {
        const user = await this.findOne(dto.email);
        if (user && user.email === dto.email) {
            throw new ConflictException('Email already in use');
        }

        return this.userRepo.save({ ...dto, password: await bcrypt.hash(dto.password, BCRYPT_ROUNDS) });
    }

    async update(id: number, dto: UpdateUserDto, user_jwt: JwtPayload): Promise<User | null> {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) return null;
        if (user_jwt.role === UserRole.USER) {
            if (user_jwt.id !== user.id) {
                throw new UnauthorizedException('Vous ne pouvez pas modifier un utilisateur autre que vous même!');
            }

            delete dto.role;
            if (dto.password) dto.password = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
        }
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepo.delete(id);
    }

    async createAdmin(): Promise<(CreateUserDto & User) | null> {
        const admin = await this.userRepo.findOneBy({ email: 'admin@admin.com' });
        if (admin) return null;

        return this.userRepo.save({
            firstname: 'admin',
            lastname: 'admin',
            role: UserRole.ADMIN,
            password: await bcrypt.hash('admin', BCRYPT_ROUNDS),
            email: 'admin@admin.com',
        } as CreateUserDto);
    }
}
