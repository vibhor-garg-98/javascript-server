import { Request, Response, NextFunction } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
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
}

export default UserController.getInstance();
