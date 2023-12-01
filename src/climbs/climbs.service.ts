import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Climb, ClimbDocument } from './climb.schema';
import { Model } from 'mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';

@Injectable()
export class ClimbsService {
    constructor(@InjectModel(Climb.name) private readonly climbModel: Model<ClimbDocument>,){}

    async getAllClimbs(): Promise<Climb[]>{
        return await this.climbModel.find();
    }
    async getPublicClimbs(): Promise<Climb[]> {
        return await this.climbModel.find({isPublic: true})
    }
    async getClimb(_id: string): Promise<Climb>{
        return await this.climbModel.findOne({_id: _id})
    }
    async getClimbsByUserId(userId:string): Promise<Climb[]>{
        let climbsByUser = await this.climbModel.find({userId})
        //console.log(climbsByUser);
        
        return await this.climbModel.find({userId});
    }

   async createClimb(body: any): Promise<Climb>{
    // console.log(dataUrl);
    
    //await this.climbModel.create({imgUrl: dataUrl})
    return await this.climbModel.create(body)
   }

   async updateClimbPrivacy(climbId: string, isPublic: boolean): Promise<Climb | null>{
        return this.climbModel.findByIdAndUpdate(climbId, { isPublic }, { new: true })
   }

   async updateClimb(_id: string, updatedClimb: Partial<Climb>): Promise<Climb | null>{
    console.log(updatedClimb);
    
    const updatedClimbData = await this.climbModel.findByIdAndUpdate(_id, updatedClimb, {new: true});
    return updatedClimbData;
   }
   async deleteClimb(_id: string): Promise<Climb>{
        const deletedClimb = await this.climbModel.findOneAndDelete({_id})
        return (deletedClimb)
   }
}