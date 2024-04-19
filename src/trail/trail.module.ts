import { Module } from '@nestjs/common';
import { TrailService } from './trail.service';
import { TrailController } from './trail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from './trail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Trail])],
    providers: [TrailService],
    controllers: [TrailController],
})
export class TrailModule {}
