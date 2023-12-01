import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

export type ClimbDocument = Climb & Document;

@Schema()
export class routes {
    @Prop()
    name: string;
    
    @Prop()
    grade: string;
}

@Schema()
export class Climb {
    @Prop({type: 'ObjectId', ref:'User', required: true})
    userId: string;

    @Prop({default: true})
    isPublic: boolean;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    type: string; 

    @Prop({required: true})
    date: string;

    @Prop()
    location: string;

  /*   @Prop()
    latlong: string;
 */
    @Prop({required: true})
    description: string;

    // @Prop()
    // grade: string
  
    @Prop({required: true})
    routes: Array<routes>;
    // trying to see if its possible to pass multiple values into the form under route ie. name and grade for each climb done in a given entry.

    @Prop()
    imgUrl: string
}

export const ClimbSchema = SchemaFactory.createForClass(Climb);