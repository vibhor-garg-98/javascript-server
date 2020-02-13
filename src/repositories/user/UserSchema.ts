import * as mongoose from "mongoose";
import VersionableSchema from '../ versionable/VersionableSchema'

class UserSchema extends VersionableSchema {
  constructor(option) {
    const userSchema = {
      id: String,
      name: String,
      address: String,
      email: String,
      dob: Date,
      mobileNumber: Number,
      role: String,
      hobbies: [String]
    };
    super(userSchema, option);
  }
}
export default UserSchema;
