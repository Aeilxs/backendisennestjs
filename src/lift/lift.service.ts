import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Lift } from './lift.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLiftDto, UpdateLiftDto } from './lift.dtos';
import { TrailService } from 'src/trail/trail.service';

@Injectable()
export class LiftService {
    constructor(
        @InjectRepository(Lift) private liftRepo: Repository<Lift>,
        private trailService: TrailService,
    ) {}

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
        if (!lift) throw new NotFoundException(`La remontée n'existe pas.`);

        const trail = await this.trailService.find(dto.id_trail);
        if (dto.id_trail && !trail) throw new NotFoundException(`La piste avec l'id ${dto.id_trail} n'existe pas.`);
        lift.trails = [trail];

        Object.assign(lift, dto);
        return this.liftRepo.save(lift);
    }

    async remove(id: number): Promise<void> {
        await this.liftRepo.delete(id);
    }
}
