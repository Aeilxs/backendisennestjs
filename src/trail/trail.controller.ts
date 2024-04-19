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
    UseInterceptors,
} from '@nestjs/common';
import { TrailService } from './trail.service';
import { Trail } from './trail.entity';
import { CreateTrailDto, UpdateTrailDto } from './trail.dtos';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('trails')
export class TrailController {
    constructor(private trailService: TrailService) {}

    @Get()
    async findAll(): Promise<Trail[]> {
        return await this.trailService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateTrailDto) {
        return await this.trailService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrailDto) {
        return await this.trailService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.trailService.remove(id);
    }
}
