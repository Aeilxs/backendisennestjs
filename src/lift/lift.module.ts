import { Module } from '@nestjs/common';
import { LiftController } from './lift.controller';
import { LiftService } from './lift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lift } from './lift.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lift])],
    controllers: [LiftController],
    providers: [LiftService],
})
export class LiftModule {}
