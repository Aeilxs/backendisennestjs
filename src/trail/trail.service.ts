import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { Repository } from 'typeorm';
import { CreateTrailDto, UpdateTrailDto } from './trail.dtos';
import { JwtPayload } from 'src/types';
import { UserRole } from 'src/types';

@Injectable()
export class TrailService {
    constructor(@InjectRepository(Trail) private liftRepo: Repository<Trail>) {}

    findAll(): Promise<Trail[]> {
        return this.liftRepo.find();
    }

    find(id: number): Promise<Trail> {
        return this.liftRepo.findOneBy({ id });
    }

    async create(dto: CreateTrailDto) {
        const trail = await this.liftRepo.findOneBy({ name: dto.name });
        if (trail && trail.name === dto.name) throw new ConflictException('Piste déjà en BDD.');
        return await this.liftRepo.save(dto);
    }

    async update(id: number, dto: UpdateTrailDto, user: JwtPayload) {
        const trail = await this.liftRepo.findOneBy({ id });
        if (!trail) return null;

        if (user.role === UserRole.USER) {
            delete dto.name;
            delete dto.difficulty;
        }

        Object.assign(trail, dto);
        return await this.liftRepo.save(trail);
    }

    async remove(id: number) {
        return await this.liftRepo.delete(id);
    }
}
