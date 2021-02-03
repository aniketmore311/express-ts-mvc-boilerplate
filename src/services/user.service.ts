import { inject, injectable, singleton } from 'tsyringe';
import { IUserService, IUserDTO } from '../types';
import { User } from '../models/entity';
import { Repository } from 'typeorm';
import { userToDTO } from '../mappers/user.mapper';

@injectable()
@singleton()
export class UserService implements IUserService {
  constructor(@inject('userRepo') public userRepo: Repository<User>) {
    const user = userRepo.create();
    user.firstName = 'aniket';
    user.lastName = 'more';
    user.email = 'email@gmail.com';
    user.password = 'pass123';
  }

  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IUserDTO> {
    const user = this.userRepo.create();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    await this.userRepo.save(user);
    const newUser = await this.userRepo.findOne({ where: { email: email } });
    if (!newUser) {
      throw new Error('user not found');
    }
    return Promise.resolve(userToDTO(newUser));
  }
}
