import { Module } from '@nestjs/common';
import { TrailService } from './trail.service';
import { TrailController } from './trail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Trail])],
    providers: [TrailService, AuthGuard, JwtService],
    controllers: [TrailController],
    exports: [TrailService],
})
export class TrailModule {}
