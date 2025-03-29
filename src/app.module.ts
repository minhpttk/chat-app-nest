import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.enntity';
import { UsersModule } from './module/users/users.module';
import { SharedModule } from './shared/shared.module';
import { EmailModule } from './service_api/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'), 
        entities: [UserEntity],
        retryAttempts: 5,
        synchronize: true,
      }),
    }),

    UsersModule,
    SharedModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
