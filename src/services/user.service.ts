import { inject, injectable, singleton } from 'tsyringe';
import bcrypt from 'bcrypt';
import { IUserService, IUserDTO } from '../types';
import { User } from '../models/entity';
import { Repository } from 'typeorm';
import { userToDTO } from '../mappers/user.mapper';
import { SiteError } from '../utils';
import { env } from '../config/env.config';

@injectable()
@singleton()
export class UserService implements IUserService {
  constructor(@inject('userRepo') public userRepo: Repository<User>) {}

  /**
   * @async
   * @description
   * creates new user and returns it
   */
  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IUserDTO> {
    const existingUser = await this.userRepo.findOne({
      where: { email: email },
    });
    if (existingUser) {
      console.log('%o', existingUser);
      return Promise.reject(new SiteError('email already taken'));
    }
    const user = this.userRepo.create();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = await bcrypt.hash(password, env.SALT_ROUNDS);
    await this.userRepo.save(user);
    const newUser = await this.userRepo.findOne({ where: { email: email } });
    if (!newUser) {
      throw new Error('user not found');
    }
    return Promise.resolve(userToDTO(newUser));
  }
}
