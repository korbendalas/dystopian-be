import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './modules/user/user.module';
import {HomeModule} from './modules/home/home.module';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {UserInterceptor} from './modules/user/interceptors/user.interceptor';
import {AuthGuard} from './modules/guards/auth.guard';
import {DatabaseModule} from '@database/database.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),UserModule,  HomeModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
