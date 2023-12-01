import { Module } from '@nestjs/common';
import { ClimbsService } from './climbs.service';
import { ClimbsController } from './climbs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Climb, ClimbSchema } from './climb.schema';
import {MulterModule} from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Climb.name,
        schema: ClimbSchema,
      },
    ]),
    // MulterModule.register({
    //   dest: './uploads', 
    // }),
  ],
  providers: [ClimbsService],
  controllers: [ClimbsController],
})
export class ClimbsModule {}