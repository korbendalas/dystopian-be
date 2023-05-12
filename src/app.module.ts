import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HomeModule } from './modules/home/home.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './modules/user/interceptors/user.interceptor';
import { AuthGuard } from './modules/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { config } from '@config';
import { TestModule } from '@api/modules/test/test.module';
import { UserModule } from '@api/modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    DatabaseModule,
    TestModule,
    UserModule,
    // HomeModule,
  ],
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
