// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const newUser = this.userRepository.create({ username, password });
    return this.userRepository.save(newUser);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: {username} });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({where: {id}});
  }
}
