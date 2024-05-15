import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Lift } from './lift.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLiftDto, UpdateLiftDto } from './lift.dtos';
import { TrailService } from 'src/trail/trail.service';
import { JwtPayload, UserRole, UpdateLiftOption } from 'src/types';

@Injectable()
export class LiftService {
    constructor(
        @InjectRepository(Lift) private liftRepo: Repository<Lift>,
        private trailService: TrailService,
    ) {}

    async findAll(): Promise<Lift[] | void> {
        return await this.liftRepo.find({
            relations: {
                trails: {
                    comments: { user: true },
                },
            },
        });
    }

    async create(dto: CreateLiftDto): Promise<CreateLiftDto & Lift> {
        const lift = await this.liftRepo.findOneBy({ name: dto.name });
        if (lift && lift.name === dto.name) throw new ConflictException('Remontée déjà en BDD');
        return this.liftRepo.save(dto);
    }

    async update(id: number, dto: UpdateLiftDto, user: JwtPayload): Promise<Lift | null> {
        const lifts = await this.findAll();
        if (!lifts) throw new NotFoundException('Pas de remontée en BDD.');
        const lift = lifts.find((l) => l.id === id);
        if (!lift) throw new NotFoundException(`La remontée n'existe pas.`);

        if (user.role === UserRole.USER) {
            delete dto.name;
            delete dto.opt;
            delete dto.trailId;
        }

        if (user.role === UserRole.ADMIN && dto.opt) {
            const trail = await this.trailService.find(dto.trailId);
            if (!trail) throw new NotFoundException(`La piste avec l'id ${dto.trailId} n'existe pas.`);

            // prettier-ignore
            dto.opt === UpdateLiftOption.ADD ?
                lift.trails = [...lift.trails, trail] :
                lift.trails.splice(lift.trails.findIndex((t) => t.id === dto.trailId), 1);
        }

        Object.assign(lift, dto);
        return this.liftRepo.save(lift);
    }

    async remove(id: number): Promise<void> {
        await this.liftRepo.delete(id);
    }
}
