import { Module } from '@nestjs/common';
import { LiftController } from './lift.controller';
import { LiftService } from './lift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lift } from './lift.entity';
import { TrailModule } from 'src/trail/trail.module';
import { TrailService } from 'src/trail/trail.service';

@Module({
    imports: [TrailModule, TypeOrmModule.forFeature([Lift])],
    controllers: [LiftController],
    providers: [LiftService],
})
export class LiftModule {}
