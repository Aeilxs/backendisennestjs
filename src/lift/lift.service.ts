import { ConflictException, Injectable } from '@nestjs/common';
import { Lift } from './lift.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLiftDto, UpdateLiftDto } from './lift.dtos';

@Injectable()
export class LiftService {
    constructor(@InjectRepository(Lift) private liftRepo: Repository<Lift>) {}

    async findAll(): Promise<Lift[] | void> {
        return await this.liftRepo.find();
    }

    async create(dto: CreateLiftDto): Promise<CreateLiftDto & Lift> {
        const lift = await this.liftRepo.findOneBy({ name: dto.name });
        if (lift && lift.name === dto.name) throw new ConflictException('Remontée déjà en BDD');
        return this.liftRepo.save(dto);
    }

    async update(id: number, dto: UpdateLiftDto): Promise<Lift | null> {
        const lift = await this.liftRepo.findOneBy({ id });
        if (!lift) return null;
        Object.assign(lift, dto);
        return this.liftRepo.save(lift);
    }

    async remove(id: number): Promise<void> {
        await this.liftRepo.delete(id);
    }
}
