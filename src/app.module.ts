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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    CommonModule,
    PrismaModule,
    AuthModule,
    MailerModule,
    UserModule,
    ProductsModule,
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
