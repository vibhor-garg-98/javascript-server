import * as mongoose from 'mongoose';

export default interface IUserModel extends mongoose.Document {
    id : string;
    name : string;
    address : string;
    email : string;
    dob : Date;
    mobileNumber : number;
    hobbies : string[];
    
}