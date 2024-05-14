import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TrailService } from 'src/trail/trail.service';
import { JwtPayload, UserRole } from 'src/types';
import { CreateCommentDto } from './comment.dtos';

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

        if (user.role === UserRole.USER && user.id != u.id) {
            throw new UnauthorizedException('Interdit de modifier un autre commentaire que le votre !');
        }

        await this.commentRepo.save({
            user: user,
            trail: trail,
            content: dto.content,
        } as unknown);
    }

    async delete(id: number) {
        return await this.commentRepo.delete({ id });
    }
}
