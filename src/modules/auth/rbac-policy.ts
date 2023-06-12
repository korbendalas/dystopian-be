import { RolesBuilder } from 'nest-access-control';
import { UserType } from '@prisma/client';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

export enum RbacPolicy {
  USER_DATA = 'USER_DATA',
  PRODUCTS = 'PRODUCTS',
}

// prettier-ignore
RBAC_POLICY
  .grant(UserType.USER)
    .readOwn(RbacPolicy.USER_DATA)
    .updateOwn(RbacPolicy.USER_DATA)
    .read(RbacPolicy.PRODUCTS)

  .grant(UserType.MANAGER)
    .extend(UserType.USER)
    .read(RbacPolicy.PRODUCTS)
    // .read('employeeDetails')
  
  .grant(UserType.ADMIN)
    .extend(UserType.MANAGER)
    .read(RbacPolicy.USER_DATA)
    .update(RbacPolicy.USER_DATA)
    .delete(RbacPolicy.USER_DATA)
    .create(RbacPolicy.PRODUCTS)
    .read(RbacPolicy.PRODUCTS)
    .update(RbacPolicy.PRODUCTS)
    .delete(RbacPolicy.PRODUCTS)
// .deny(Role.ADMIN)
// .read('managedEmployeeData')
