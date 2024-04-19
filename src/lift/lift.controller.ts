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
import { LiftService } from './lift.service';
import { CreateLiftDto, UpdateLiftDto } from './lift.dtos';
import { Lift } from './lift.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('lifts')
export class LiftController {
    constructor(private liftService: LiftService) {}

    @Get()
    async findAll() {
        return await this.liftService.findAll();
    }

    @Post()
    create(@Body() dto: CreateLiftDto) {
        return this.liftService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLiftDto): Promise<Lift> {
        return this.liftService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.liftService.remove(id);
    }
}
