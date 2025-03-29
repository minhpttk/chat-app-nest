import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.enntity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/service_api/email/email.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly emailService: EmailService, // Inject the EmailService here
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.save(
      this.usersRepository.create(createUserDto)
    );
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  sendEmail(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    return this.emailService.sendWelcomeEmail(email);
  }
}
