import { Request, Response } from "express";
import  {UserRepository}  from "./../../repositories/user/UserRepository";
import SystemResponse from "../../libs/SystemResponse";
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

  create = (req: Request, res: Response) => {
    try {
      console.log(" :::::::::: Inside Create User :::::::: ");

      const { email, name, address, hobbies, dob, mobileNumber } = req.body;

      this.userRepository
        .create({ email, name, address, hobbies, dob, mobileNumber })
        .then(user => {
          console.log(user);
          return SystemResponse.success( res, user, "User added successfully" );
        })
        .catch(error => {
          throw error;
        });
    } catch (err) {}
  };

  list = (req: Request, res: Response) => {
    try {
      console.log(" :::::::::: Inside List User :::::::: ");
      
      this.userRepository.list().then(user => {
          console.log(user);
          return SystemResponse.success(res, user, "Users Listed Successfully");
        })
        .catch(error => {
          throw error;
        });
    } catch (err) {}
  };
  update = (req: Request, res: Response) => {
    try {
      console.log(" :::::::::: Inside Update Trainee :::::::: ");
      const { id, dataToUpdate } = req.body;
      this.userRepository
        .update({ _id: id }, dataToUpdate)
        .then(user => {
          this.userRepository
            .findOne({ _id: id })
            .then(user => {
              console.log(user);
              return SystemResponse.success(res, user, " User Updated successfully");
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        });
    } catch (err) {}
  };
  delete = (req: Request, res: Response) => {
    try {
      console.log(" :::::::::: Inside Delete User :::::::: ");
      const data = req.params;
      this.userRepository
        .delete(data.id)
        .then(user => {
          console.log(user);
          return SystemResponse.success(res, user, "User Deleted Successfully");
        })
        .catch(error => {
          throw error;
        });
    } catch (err) {}
  };
}

export default UserController.getInstance();
