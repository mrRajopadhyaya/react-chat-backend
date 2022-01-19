import mongoose, { Mongoose } from 'mongoose';
require('dotenv').config();
const { DB_URL } = process.env;

const mongooseInstance = (): Promise<Mongoose> => {
  return mongoose.connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export default mongooseInstance;
