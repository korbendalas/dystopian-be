import { User } from '@prisma/client';

export interface IBlacklistedToken {
  tokenId: string;
  user: User;
  createdAt: Date;
}
