import { Module } from '@nestjs/common';
import { LiftController } from './lift.controller';
import { LiftService } from './lift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lift } from './lift.entity';
import { TrailModule } from 'src/trail/trail.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TrailModule, TypeOrmModule.forFeature([Lift])],
    controllers: [LiftController],
    providers: [LiftService, AuthGuard, JwtService],
})
export class LiftModule {}
