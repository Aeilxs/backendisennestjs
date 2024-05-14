import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/user.module';
import { TrailModule } from 'src/trail/trail.module';
import { CommentService } from './comment.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), UserModule, TrailModule],
    providers: [CommentService, JwtService],
    controllers: [CommentController],
})
export class CommentModule {}
