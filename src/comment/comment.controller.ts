import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtRequest, UserRole } from 'src/types';
import { Authorize } from 'src/auth/authorize.decorator';
import { CreateCommentDto, UpdateCommentDto } from './comment.dtos';

@UseGuards(AuthGuard, RolesGuard)
@Authorize([UserRole.ADMIN, UserRole.USER])
@UseInterceptors(ClassSerializerInterceptor)
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post()
    create(@Request() req: JwtRequest, @Body() dto: CreateCommentDto) {
        this.commentService.create(req.user, dto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto, @Req() req: JwtRequest) {
        this.commentService.update(id, req.user, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Req() req: JwtRequest) {
        this.commentService.delete(id, req.user);
    }
}
