import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TrailService } from 'src/trail/trail.service';
import { JwtPayload, UserRole } from 'src/types';
import { CreateCommentDto, UpdateCommentDto } from './comment.dtos';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
        private userService: UserService,
        private trailService: TrailService,
    ) {}

    async create(u: JwtPayload, dto: CreateCommentDto) {
        const trail = await this.trailService.find(dto.trailId);
        const user = await this.userService.findOne(u.email);

        await this.commentRepo.save({
            user: user,
            trail: trail,
            content: dto.content,
        } as unknown);
    }

    async update(id: number, u: JwtPayload, dto: UpdateCommentDto) {
        const user = await this.userService.findOne(u.email);
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (user.role === UserRole.USER && comment.user.id != u.id) {
            return new UnauthorizedException('Interdit de modifier un autre commentaire que le votre !');
        }

        comment.content = dto.content;
        return await this.commentRepo.save(comment);
    }

    async delete(id: number, u: JwtPayload) {
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (u.role === UserRole.USER && comment.user.id != u.id) {
            return new UnauthorizedException('Interdit de supprimer un autre commentaire que le votre !');
        }

        return await this.commentRepo.delete(id);
    }
}
