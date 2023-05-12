import { UserType } from '../types';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserType[]) => {
  return SetMetadata('roles', roles);
};
