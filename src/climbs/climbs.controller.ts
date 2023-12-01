import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClimbsService } from './climbs.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Climb } from './climb.schema';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';

@Controller('climbs')
export class ClimbsController {
  constructor(private readonly climbsService: ClimbsService) {}
  //to view all registered climbs

  @UseGuards(JwtAuthGuard) // so that the user can only access the climbs data if they are logged in
  @Get('all')
  getAllClimbs(): any {
    const climbs = this.climbsService.getAllClimbs();
    return climbs;
  }

  @UseGuards(JwtAuthGuard)
/*   @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
  })) */
  @Get('select/:_id')
  async getClimb(@Param('_id') _id: string): Promise<Climb | null> {
    try {
      const foundClimb = await this.climbsService.getClimb(_id);
      console.log(foundClimb);
      return foundClimb;
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('public')
  async getPublicClimbs(): Promise<any> {
    try {
      const publicClimbs = this.climbsService.getPublicClimbs();
      return publicClimbs;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getClimbsbyUserId(@Request() req): Promise<Climb[]> {
    try {
      return await this.climbsService.getClimbsByUserId(req.user.userId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
  }))
  @Post('new')
  async createClimb(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ): Promise<Climb> {
    // console.log(req.file);
    body.userId = req.user.userId;
    console.log(file);
    
    body.imgUrl = "http://localhost:3007/uploads/"+file.originalname

    try {
      const createdClimb = await this.climbsService.createClimb(body);
      return createdClimb;
    } catch (error) {
      throw error;
    }
  }

  @Patch('privacy/:climbId')
  async updateClimbPrivacy(
    @Param('climbId') climbId: string,
    @Body('isPublic') isPublic: boolean,
  ): Promise<Climb | null> {
    return this.climbsService.updateClimbPrivacy(climbId, isPublic);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
  }))
  @Put(':_id')
  async updateClimb(
    @Param('_id') _id: string,
    @Body() updatedClimb: Partial<Climb>,
  ): Promise<any> {
    try {
      const updatedClimbData = await this.climbsService.updateClimb(
        _id,
        updatedClimb,
      );
      return updatedClimbData;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:_id')
  async deleteClimb(@Param('_id') _id: string): Promise<any> {
    try {
      const deletedClimb = await this.climbsService.deleteClimb(_id);
      console.log(deletedClimb);
      console.log('Climb deleted.');
    } catch (error) {
      throw error;
    }
  }
}
