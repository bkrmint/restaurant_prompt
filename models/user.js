import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it should contain 8-20 alphanumeric letters and be unique!'],
  },
  image: {
    type: String,
  },
});

// If it was express then we would have done this
// const User = model('User', UserSchema);
// export default User;

// The "models" object is provided by the Mongoose library stores all the registered model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// If a model named "User" does not exist, it creates a new model named "User" and assigns it to the "User" variable.

// This is important, because everytime the connection is called in Next.js we need to make sure that use the existing model, only when it is not there it has to be created.
const User = models.User || model('User', UserSchema);

export default User;
