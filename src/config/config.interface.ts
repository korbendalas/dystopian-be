import { IEmailConfig } from './email-config.interface';
import { IJwt } from './jwt.interface';
import { PrismaClientOptions } from '@prisma/client/runtime';

export interface IConfig {
  id: string;
  port: number;
  domain: string;
  // import prisma module options type connection string
  db: PrismaClientOptions;
  jwt: IJwt;
  emailService: IEmailConfig;
}
