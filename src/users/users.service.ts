import { Injectable, NotFoundException } from '@nestjs/common';
//import * as bcrypt from 'bcrypt'; 
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async getAllUsers(){
        return await this.userModel.find();
    }
    async getByUserName(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({username}).lean();
    }
    /* async getUserById(_id: string): Promise<User>{
        return await this.userModel.findOne({_id}).lean();
    } */
    
    async createUser(body: any): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const newUser = new this.userModel({ ...body, password: hashedPassword });
        return await newUser.save();
    }

    async updateUserPassword(_id: string, body: any): Promise<any> {
        const saltRounds = 10;
        body.password = await bcrypt.hash(body.password, saltRounds);
        const editedUser = await this.userModel.findOneAndUpdate({ _id }, {password: body.password}, {
          new: true,
        });
        if (!editedUser) {
          throw new NotFoundException(`Error updating password, user details not found.`);
        }
        return editedUser;
    }

    async updateUsername(_id: string, body: any): Promise<any>{
        const editedUser = await this.userModel.findOneAndUpdate({_id}, {username: body.username}, {
            new: true,
        });
        if(!editedUser){
            throw new NotFoundException('Error updating username, details not found.')
        }
        return await editedUser;
    }
}
