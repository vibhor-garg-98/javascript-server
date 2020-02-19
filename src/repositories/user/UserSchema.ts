import VersionableSchema from '../versionable/VersionableSchema';

class UserSchema extends VersionableSchema {
  constructor(option) {
    const userSchema = {
      id: String,
      name: String,
      address: String,
      email: String,
      dob: Date,
      mobileNumber: Number,
      role: {
        type: String,
        default: 'trainee'
      },
      hobbies: [String],
      password: String,
    };
    super(userSchema, option);
  }
}
export default UserSchema;
