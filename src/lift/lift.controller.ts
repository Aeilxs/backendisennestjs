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
import { LiftService } from './lift.service';
import { CreateLiftDto, UpdateLiftDto } from './lift.dtos';
import { Lift } from './lift.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Authorize } from 'src/auth/authorize.decorator';
import { UserRole } from 'src/user/user.entity';
import { JwtRequest } from 'src/constants';

@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('lifts')
export class LiftController {
    constructor(private liftService: LiftService) {}

    @Get()
    @Authorize([UserRole.ADMIN, UserRole.USER])
    async findAll() {
        return await this.liftService.findAll();
    }

    @Post()
    @Authorize([UserRole.ADMIN])
    create(@Body() dto: CreateLiftDto) {
        return this.liftService.create(dto);
    }

    @Put(':id')
    @Authorize([UserRole.ADMIN, UserRole.USER])
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateLiftDto,
        @Req() req: JwtRequest,
    ): Promise<Lift> {
        return this.liftService.update(id, dto, req.user);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.liftService.remove(id);
    }
}
