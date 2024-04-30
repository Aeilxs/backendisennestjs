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
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { TrailService } from './trail.service';
import { Trail } from './trail.entity';
import { CreateTrailDto, UpdateTrailDto } from './trail.dtos';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Authorize } from 'src/auth/authorize.decorator';
import { UserRole } from 'src/types';
import { JwtRequest } from 'src/types';

@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('trails')
export class TrailController {
    constructor(private trailService: TrailService) {}

    @Get()
    @Authorize([UserRole.ADMIN, UserRole.USER])
    async findAll(): Promise<Trail[]> {
        return await this.trailService.findAll();
    }

    @Post()
    @Authorize([UserRole.ADMIN])
    async create(@Body() dto: CreateTrailDto): Promise<CreateTrailDto & Trail> {
        return await this.trailService.create(dto);
    }

    @Put(':id')
    @Authorize([UserRole.ADMIN, UserRole.USER])
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTrailDto,
        @Req() req: JwtRequest,
    ): Promise<Trail> {
        return await this.trailService.update(id, dto, req.user);
    }

    @Delete(':id')
    @Authorize([UserRole.ADMIN])
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.trailService.remove(id);
    }
}
