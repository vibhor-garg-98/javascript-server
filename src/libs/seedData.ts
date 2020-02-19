import  UserRepository  from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import config from '../config/configuration';
import * as mongoose from 'mongoose';

const userRepository = new UserRepository();

function generateObjectId() {
  return String(mongoose.Types.ObjectId());
}

export default async () => {
  const user = {
    name: 'Head Trainer',
    address: 'Noida',
    dob: new Date('12/27/1993'),
    email: 'vinay@nodeexperts.com',
    mobileNumber: 9718223533,
    role: 'head-trainer',
    hobbies: ['Touring']
  };

 const count = await userRepository.count();
      console.log('Count as users is', count);

      if (!count) {
        bcrypt.hash(config.password, 10, (err, hash) => {
            Object.assign(user, { password: hash });
            const id = 'created by head trainer';
            return userRepository.create(user, {_id: id}).then(res => {
              console.log('User seeded successfully', res);
            });
        });
      }
      console.log('User already seeded');
};
