import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClimbsController } from './climbs/climbs.controller';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClimbsModule } from './climbs/climbs.module';
import { ClimbsService } from './climbs/climbs.service';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ClimbsPage'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UsersModule,
    AuthModule, 
    ClimbsModule,
  ], //to declare the modules 
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

