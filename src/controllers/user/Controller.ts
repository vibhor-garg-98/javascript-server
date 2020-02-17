import { Request, Response, NextFunction } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import config from '../../config/configuration';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class UserController {
    static instance: UserController;
    static userRepository: UserRepository;
    userRepository = new UserRepository();

    static getInstance = () => {
      if (UserController.instance) {
        return UserController.instance;
      }
      UserController.instance = new UserController();
      return UserController.instance;
    };
    me = (req: IRequest, res: Response, next: NextFunction) => {
      /*console.log('Inside me routes');*/
      res.send(req.user);
    };
    login = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;

        const user = await this.userRepository.findOne({ email });
        if (!user) {
          return next({ error: 'User not found', status: 404 });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          return next({ error: 'passwoed does not match', status: 422 });
        }
        const token = jwt.sign(
          { email: user.email, id: user.originalID, role: user.role },
          config.secretKey
        );
        res.status(200).send({message: 'login successfully', data: token, status: 'success'});
      } catch (err) {
        throw err;
      }
    };

    // create = async (req: IRequest, res: Response) => {
    //   try {
    //     console.log(':::::::::: Inside Create User :::::::: ');

    //     const {email, name, address, hobbies, dob, mobileNumber, role} = req.body;

    //     const user = await this.userRepository.create({ email, name, address, hobbies, dob, mobileNumber, role}, req.user);
    //     console.log(user);
    //     return SystemResponse.success(res, user, 'User added successfully');
    //   } catch (err) {
    //     throw err;
    //   }
    // };

    // list = async (req: Request, res: Response) => {
    //   try {
    //     console.log(' :::::::::: Inside List User :::::::: ');

    //     const user = await this.userRepository.list();

    //     console.log(user);
    //     return SystemResponse.success(res, user, 'Users Listed Successfully');
    //   } catch (err) {
    //     throw err;
    //   }
    // };
    // update = async (req: IRequest, res: Response) => {
    //   try {
    //     console.log(' ::::::::: Inside Update Trainee :::::::: ');
    //     const { id, dataToUpdate } = req.body;
    //     const User = await this.userRepository.update({ _id: id }, dataToUpdate, req.user);

    //     const user = await this.userRepository.findOne({ _id: id });

    //     console.log(user);
    //     return SystemResponse.success(res, user, ' User Updated successfully');
    //   } catch (err) {
    //     throw err;
    //   }
    // };
    // delete = async (req: IRequest, res: Response) => {
    //   try {
    //     console.log(' :::::::::: Inside Delete User :::::::: ');
    //     const { id } = req.params;
    //     const user = await this.userRepository.delete({ _id: id }, req.user);

    //     console.log(user);
    //     return SystemResponse.success(res, user, 'User Deleted Successfully');
    //   } catch (err) {
    //     throw err;
    //   }
    // };
}

export default UserController.getInstance();
