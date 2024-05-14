import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtRequest, UserRole } from 'src/types';
import { Authorize } from 'src/auth/authorize.decorator';
import { CreateCommentDto } from './comment.dtos';

@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get()
    @Authorize([UserRole.ADMIN, UserRole.USER])
    find() {}

    @Post()
    create(@Request() req: JwtRequest, @Body() dto: CreateCommentDto) {
        this.commentService.create(req.user, dto);
    }

    @Put(':id')
    update() {}

    @Delete(':id')
    remove() {}
}
