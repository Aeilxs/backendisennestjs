import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpCode,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dtos';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Authorize } from 'src/auth/authorize.decorator';
import { JwtRequest } from 'src/types';
import { UserRole } from 'src/types';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Authorize([UserRole.ADMIN])
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<User> {
        return this.userService.create(dto);
    }

    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Authorize([UserRole.ADMIN, UserRole.USER])
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
        @Req() req: JwtRequest,
    ): Promise<User> {
        return this.userService.update(id, dto, req.user);
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Authorize([UserRole.ADMIN])
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
