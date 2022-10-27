import mongoose, {
  Schema
} from 'mongoose';

const contactSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  phone: String
});

export const ModelContact = mongoose.model('ModelContact', contactSchema)