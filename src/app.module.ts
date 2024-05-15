import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LiftModule } from './lift/lift.module';
import { AuthModule } from './auth/auth.module';
import { TrailModule } from './trail/trail.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

import { User } from './user/user.entity';
import { Lift } from './lift/lift.entity';
import { Trail } from './trail/trail.entity';
import { Comment } from './comment/comment.entity';

import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_HOST } from './constants';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        LiftModule,
        TrailModule,
        CommentModule,
        ChatModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>(DB_HOST),
                port: parseInt(configService.get<string>(DB_PORT), 10),
                username: configService.get<string>(DB_USERNAME),
                password: configService.get<string>(DB_PASSWORD),
                database: configService.get<string>(DB_NAME),
                entities: [User, Lift, Trail, Comment],
                synchronize: false,
            }),
        }),
    ],
})
export class AppModule {}
