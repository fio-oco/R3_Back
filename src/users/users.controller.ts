import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.usersService.getAllUsers();
      return { data: users };
    } catch (error) {
      throw error;
    }
  }
  @Get(':username')
  async getByUserName(@Param('username') username: string): Promise<any> {
    try {
      return await this.usersService.getByUserName(username);
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  async createUser(@Body() body: any): Promise<User> {
    try {
      const createdUser = await this.usersService.createUser(body);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch('editpw')
  async updatePassword(
    @Request() req: any,
    // ?? input by query/ how?? to input id
    @Body() body: any,
  ): Promise<any> {
    const editedUser = await this.usersService.updateUserPassword(
      req.user.userId,
      body,
    );
    return editedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('editUsername')
  async updateUsername(@Request() req: any, @Body() body: any): Promise<any> {
    console.log(req.user.userId);
    const editedUser = await this.usersService.updateUsername(
      req.user.userId,
      body,
    );
    return editedUser;
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req: any, @Body() body: any): Promise<any>{
    console.log(req.user.userId);
    const deletedUser = await this.usersService.updateUsername(
        req.user.userId,
        body,
    );
    console.log(deletedUser);
  }
}
