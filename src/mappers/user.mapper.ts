import { IUserDTO, IUser } from '../types';

export function userToDTO(user: IUser): IUserDTO {
  const userDTO: IUserDTO = {
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return userDTO;
}
