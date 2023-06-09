import { IEmailConfig } from './email-config.interface';
import { IJwt } from './jwt.interface';

export interface IDomain {
  frontend: string;
  backend: string;
}
export interface IBcrypt {
  salt: number;
}

export interface IConfig {
  id: string;
  port: number;
  domain: IDomain;
  // import prisma module options type connection string
  db: string;
  jwt: IJwt;
  bcypt: IBcrypt;
  emailService: IEmailConfig;
}
