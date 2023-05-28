import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  async onModuleInit() {
    console.log('PRISMA INIT!!');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log('PRISMA DESTROYED!!');
    await this.$disconnect();
  }
}
