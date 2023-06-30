import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
// import { HomeModule } from './modules/home/home.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './modules/user/interceptors/user.interceptor';
import { AuthGuard } from './common/guards/auth.guard';
import { RemovePasswordInterceptor } from './modules/user/interceptors/removePassword.interceptor';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { config } from './config';
import { CommonModule } from './modules/common/common.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { AtGuard } from './common/guards/at.guard';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { RBAC_POLICY } from './modules/auth/rbac-policy';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      ttl: 60,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      //  host: 'redis://localhost:6379', // process.env.REDIS_HOST,
      //port: Number(process.env.REDIS_PORT),
      // ttl: Number(process.env.REDIS_TTL),
    }),
    CommonModule,
    PrismaModule,
    AuthModule,
    MailerModule,
    UserModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: UserInterceptor,
    // },
    { provide: APP_INTERCEPTOR, useClass: RemovePasswordInterceptor },
    { provide: APP_GUARD, useClass: AtGuard },
    { provide: APP_GUARD, useClass: ACGuard },
  ],
})
export class AppModule {}
