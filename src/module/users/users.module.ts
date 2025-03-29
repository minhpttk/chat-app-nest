import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.enntity';
import { EmailModule } from 'src/service_api/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity
  ]),
  EmailModule 
],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
