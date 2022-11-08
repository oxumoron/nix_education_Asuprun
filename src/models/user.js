import {
  Schema,
  model,
  trusted
} from 'mongoose';

import passportLocalMongoose from 'passport-local-mongoose';

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

User.plugin(passportLocalMongoose);

export default model('User', User);