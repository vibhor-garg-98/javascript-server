import * as mongoose from "mongoose";
import IUserModel from "./IUserModel";
import { userModel } from "./UserModel";
import IUserCreate from "../entities/IUserCreate";
import VersionableRepository from "../ versionable/VersionableRepository";

export default class UserRepository extends VersionableRepository<IUserModel,mongoose.Model<IUserModel>> {
  private userModel: mongoose.Model<IUserModel>;

  constructor() {
    super(userModel);
    this.userModel = userModel;
  }

  create = (data: any): Promise<IUserModel> => {
    return super.create(data);
  };

  count = (): mongoose.Query<Number> => {
    return super.count();
  };

  findOne = data => {
    return super.findOne(data);
  };

  list = () => {
    return super.list();
  };

  delete = id => {
    return super.delete(id);
  };
}
