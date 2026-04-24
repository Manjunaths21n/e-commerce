import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from 'data-layer';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    } as any);
    await this.userRepository.getEntityManager().persistAndFlush(user);
    return user;
  }
}
