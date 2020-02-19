import { Request, Response, NextFunction } from 'express';
import IRequest from '../../libs/routes/IRequest';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import * as bcrypt from 'bcrypt';
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
      let password = req.body;
      bcrypt.hash(config.password, 10, (err, hash) => {
        password = hash;
        const user = this.userRepository.create({ email, name, address, hobbies, dob, mobileNumber, role, password}, req.user).then( user => {
        console.log(user);
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
      const {limit, skip} = req.query;
      if (req.query.name) {
        if(req.query.email){
          const user = await this.userRepository.list({name: req.query.name, email: req.query.email, deletedAt: undefined}, limit, skip);
          // console.log(user);
          const count = await this.userRepository.count();
          // console.log(count);
          // console.log('>>>>>>>>>>>>>',this.isEmpty(user))
          if (this.isEmpty(user)) {
            return next({
              error: 'No user found',
              message: 'No user found',
              timestamp: new Date(),
              status: 500
            });
          }
          return SystemResponse.success(res, { Total_count: count, ...user}, 'Trainee Listed Successfully');
        }
        else {
          const user = await this.userRepository.list({name: req.query.name, deletedAt: undefined}, limit, skip);
          // console.log(user);
          const count = await this.userRepository.count();
          // console.log(count);
          // console.log('>>>>>>>>>>>>>',this.isEmpty(user))
          if (this.isEmpty(user)) {
            return next({
              error: 'No user found',
              message: 'No user found',
              timestamp: new Date(),
              status: 500
            });
          }
          return SystemResponse.success(res, { Total_count: count, ...user}, 'Trainee Listed Successfully');
        }
      }
      else if (req.query.email) {
        const user = await this.userRepository.list({email: req.query.email, deletedAt: undefined}, limit, skip);
          // console.log(user);
          const count = await this.userRepository.count();
          // console.log(count);
          // console.log('>>>>>>>>>>>>>',this.isEmpty(user))
          if (this.isEmpty(user)) {
            return next({
              error: 'No user found',
              message: 'No user found',
              timestamp: new Date(),
              status: 500
            });
          }
          return SystemResponse.success(res, { Total_count: count, ...user}, 'Trainee Listed Successfully');
      }
      else {
        const user = await this.userRepository.list({deletedAt: undefined}, limit, skip);
          // console.log(user);
          const count = await this.userRepository.count();
          // console.log(count);
          // console.log('>>>>>>>>>>>>>',this.isEmpty(user))
          if (this.isEmpty(user)) {
            return next({
              error: 'No user found',
              message: 'No user found',
              timestamp: new Date(),
              status: 500
            });
          }
          return SystemResponse.success(res, { Total_count: count, ...user}, 'Trainee Listed Successfully');
      }
    }
    catch (err) {
      throw err;
    }
  };

  delete = async (req: IRequest, res: Response) => {
    try {
      console.log(' :::::::::: Inside Delete Trainee :::::::: ');
      const { id } = req.params;
      const user = await this.userRepository.delete({ _id: id }, req.user);

      console.log(user);
      return SystemResponse.success(res, user, 'Trainee Deleted Successfully');
    } catch (err) {
      throw err;
    }
  };

  update = async (req: IRequest, res: Response) => {
    try {
      console.log(' ::::::::: Inside Update Trainee :::::::: ');
      const { id, dataToUpdate } = req.body;
      const User = await this.userRepository.update({ _id: id }, dataToUpdate, req.user);

      const user = await this.userRepository.findOne({ _id: id });

      console.log(user);
      return SystemResponse.success(res, user, ' Trainee Updated successfully');
    } catch (err) {
      throw err;
    }
  };
}
export default TraineeController.getInstance();