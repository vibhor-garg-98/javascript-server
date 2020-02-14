import * as mongoose from 'mongoose';

class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
  static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }
  private modelType: M;

  constructor(modelType) {
    this.modelType = modelType;
  }

  count(): mongoose.Query<number> {
    return this.modelType.countDocuments();
  }

  findOne(query): mongoose.Query<D> {
    return this.modelType.findOne(query);
  }

  public create(options): Promise<D> {
    const id = VersionableRepository.generateObjectId();

    return this.modelType.create({
      ...options,
      _id: id,
      originalID: id,
      createdBy: id
    });
  }

  public update(id, data) {
    this.modelType
      .findById(id)
      .then(user => {
        const updatedData = Object.assign(user, data);
        this.updateAndCreate(updatedData);
      })
      .catch(error => {
        throw error;
      });
    const deleteddata = {
      deletedBy: id,
      deletedAt: new Date()
    };
    return this.modelType.update(id, deleteddata);
  }

  public updateAndCreate(options) {
    console.log(options);
    const id = VersionableRepository.generateObjectId();
    return this.modelType.create({
        ...options.toObject(),
      originalID: options.originalID,
      _id: id,
      createdBy: id,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: id
    });
  }

  public delete(id) {
    const deleteddata = {
        deletedBy: id,
        deletedAt: new Date()
      };
    return  this.modelType.update( id, deleteddata );
  }
  public list() {
    return this.modelType.find({ deletedAt: undefined });
  }
}
export default VersionableRepository;
