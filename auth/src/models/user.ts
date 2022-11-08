import mongoose, { Document, Model } from 'mongoose';
const { Schema, model } = mongoose;

/// Properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

/// An interface that describes the properties that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/// An interface that describe the properties that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'User must have email'],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, 'User must have a password'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };
