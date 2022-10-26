import mongoose, {
  Schema
} from 'mongoose';

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String
});

export const ModelContact = mongoose.model('ModelContact', contactSchema)