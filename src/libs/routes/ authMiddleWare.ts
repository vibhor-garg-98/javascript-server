import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "./../../config/configuration";
import hasPermission from "./permissions";
import IRequest from "./IRequest";
import UserRepository from "../../repositories/user/UserRepository";

const userRepository = new UserRepository();

export default (module, permissionType) => (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(
      ":::::::::::AUTHMIDDLEWARE::::::::::::::::",
      module,
      permissionType
    );
    const token: string = req.headers.authorization;

    const { secretKey } = config;

    const decodeUser = jwt.verify(token, secretKey);

    if (!decodeUser) {
      next({
        status: 403,
        error: "Unauthorized Access",
        message: "Unauthorized Access"
      });
    }
    const { _id, email } = decodeUser;
    userRepository
      .findOne({ _id: _id, email: email })
      .then(user => {
        if (!user) {
          next({
            status: 403,
            error: "Unauthorized Access",
            message: "User does not Exist in the System"
          });
        }
        req.user = user;
      })
      .then(() => {
        if (!hasPermission(module, decodeUser["role"], permissionType)) {
          next({
            status: 403,
            error: "Unauthorized Access",
            message: "Unauthorized Access"
          });
        }

        next();
      });
  } catch (error) {
    next({
      status: 403,
      error: "Unauthorized Access",
      message: error.message
    });
  }
};
