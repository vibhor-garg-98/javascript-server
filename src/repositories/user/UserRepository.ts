import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import IUserCreate from '../entities/IUserCreate';
import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
  private userModel: mongoose.Model<IUserModel>;

  constructor() {
    super(userModel);
    this.userModel = userModel;
  }

  create = (data, userId): Promise<IUserModel> => {
    return super.create(data, userId);
  };

  count = () => {
    return super.count();
  };

  findOne = data => {
    return super.findOne(data);
  };
  update = (id, data, userId) => {
    return super.update(id, data, userId);
  }

  list = (data, limit, skip, sortData) => {
    return super.list(data, limit, skip, sortData);
  };

  delete = (id, userId) => {
    return super.delete(id, userId);
  };
}
