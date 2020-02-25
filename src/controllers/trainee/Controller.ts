import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import IRequest from '../../libs/routes/IRequest';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import config from '../../config/configuration';

class TraineeController {
  static instance: TraineeController;
  static userRepository: UserRepository;
  userRepository = new UserRepository();

  isEmpty = (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }
  static getInstance = () => {
    if (TraineeController.instance) {
      return TraineeController.instance;
    }
    TraineeController.instance = new TraineeController();
    return TraineeController.instance;
  };

  create = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      console.log(':::::::::: Inside Create Trainee :::::::::: ');

      const {email, name, address, hobbies, dob, mobileNumber, role} = req.body;
      const emailLowerCase = email.toLowerCase();
      let password = req.body;
      const emailVerify = await this.userRepository.findOne({email: emailLowerCase});
      if (emailVerify ) {
        return next({
          error: 'user already exist',
          message: 'user already exist',
          status: 500
        });
      }
      bcrypt.hash(config.password, 10, (err, hash) => {
        password = hash;
        const user = this.userRepository.create({ email: emailLowerCase, name, address, hobbies, dob, mobileNumber, role, password}, req.user).then( user => {
        // console.log(user);
          if (!user) {
            return next({
              error: 'error in creatation',
              message: 'error in creatation',
              status: 500
            });
          }
          return SystemResponse.success(res, user, 'Trainee added successfully');
         });
      });
    } catch (err) {
      throw err;
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(' :::::::::: Inside List Trainee :::::::: ');
      const {limit, skip, search } = req.query;
      let sortData;
      const counts = await this.userRepository.count();
      if (req.query.sortData === 'email')
      sortData = { email: 1 };
          else if (req.query.sortData === 'name')
          sortData = { name: 1 };
          else
          sortData = { createdAt: -1 };
          // console.log(search);
      if (search) {
        const searching = search.split(':');
        console.log(searching);
        const user = await this.userRepository.list({[searching[0]]: [searching[1]], deletedAt: undefined}, limit, skip, sortData);
        // console.log(user);
        if (this.isEmpty(user)) {
          return next({
              error: 'No user found',
              message: 'No user found',
              timestamp: new Date(),
              status: 500
           });
        }
       // console.log(typeof user);
        return SystemResponse.success(res, { Total_count: counts, ...user}, 'Trainee Listed Successfully');
      }
      else {
        const user = await this.userRepository.list({deletedAt: undefined}, limit, skip, sortData);
        return SystemResponse.success(res, { Total_count: counts, ...user}, 'Trainee Listed Successfully');
      }
    } catch (err) {
      throw err;
    }
  };

  delete = async (req: IRequest, res: Response) => {
    try {
      console.log(' :::::::::: Inside Delete Trainee :::::::: ');
      const { id } = req.params;
      const user = await this.userRepository.delete({ originalID: id }, req.user);

      // console.log(user);
      return SystemResponse.success(res, user, 'Trainee Deleted Successfully');
    } catch (err) {
      throw err;
    }
  };

  update = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      console.log(' ::::::::: Inside Update Trainee :::::::: ');
      const { id, dataToUpdate } = req.body;
      if (!dataToUpdate.email) {
        const User = await this.userRepository.update({ originalID: id, deletedAt: undefined}, dataToUpdate, req.user);

        const user = await this.userRepository.findOne({ originalID: id, deletedAt: undefined });

        // console.log(user);
        return SystemResponse.success(res, user, ' Trainee Updated successfully');
      } else {
        return next({
          error: 'email cant not be updated',
          message: 'email cant not be updated',
          timestamp: new Date(),
          status: 500
        });
      }

    } catch (err) {
      throw err;
    }
  };
}
export default TraineeController.getInstance();