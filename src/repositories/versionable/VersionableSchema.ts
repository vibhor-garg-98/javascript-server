import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {
  constructor(schema, option) {
    const baseSchema = {
      createdAt: {
        type: Date,
        default: Date.now
      },
      originalID: String,
      updatedAt: Date,
      deletedAt: Date,
      createdBy: String,
      updatedBy: String,
      deletedBy: String,
      password: String
    };
    super({ ...schema, ...baseSchema }, option);
  }
}
export default VersionableSchema;
