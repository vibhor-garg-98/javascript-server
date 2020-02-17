import * as mongoose from 'mongoose';

class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
  static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }
  private modelType: M;

  constructor(modelType) {
    this.modelType = modelType;
  }

  public async count(): Promise<number> {
    return await this.modelType.find({deletedAt: undefined}).count();
  }

  public async findOne(query): Promise<D> {
    return await this.modelType.findOne(query);
  }

  public async create(options, userId): Promise<D> {
    const id = VersionableRepository.generateObjectId();

    return await this.modelType.create({
      ...options,
      _id: id,
      originalID: id,
      createdBy: userId._id
    });
  }

  public async update(id, data, userId): Promise<D> {
    const user = await this.modelType.findById(id);
        const updatedData = Object.assign(user, data);
        await this.updateAndCreate(updatedData, userId);
    const deleteddata = {
      deletedBy: userId._id,
      deletedAt: new Date()
    };
    return await this.modelType.update(id, deleteddata);
  }

  public async updateAndCreate(options, userId): Promise<D> {
    console.log(options);
    const id = VersionableRepository.generateObjectId();
    return await this.modelType.create({
        ...options.toObject(),
      originalID: options.originalID,
      _id: id,
      createdBy: userId._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: userId._id
    });
  }

  public async delete(id, userId): Promise<D> {
    const deleteddata = {
        deletedBy: userId._id,
        deletedAt: new Date()
      };
    return await this.modelType.update( id, deleteddata );
  }
  public async list(data, limit, skip): Promise<any> {
    return await this.modelType.find(data).limit(limit).skip(skip);
  }
}
export default VersionableRepository;
