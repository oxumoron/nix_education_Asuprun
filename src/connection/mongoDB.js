import mongoose from "mongoose";

const username = encodeURIComponent("Admin");
const password = encodeURIComponent("123321");
const cluster = "testbd.s0uqqhg.mongodb.net";

const mongoDB = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
export const db = mongoose.connect(mongoDB)
  .then(() => console.log('DB connected'))
  .catch(error => console.log(error))