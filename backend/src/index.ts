import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usrRouter from './routes/users';
import doctorRoute from './routes/doctor';
import hospitalRoute from './routes/hospital';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import whoIsLoggedIn from './routes/whoIsLoggedIn';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const connect = async () => {
  const mongoConnect = process.env.MONGO || '';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoConnect);
    console.log('connected to mongodb');
  } catch (er) {
    throw er;
  }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Api is Running.');
});

app.use('/who', whoIsLoggedIn);
app.use('/user', usrRouter);
app.use('/doctor', doctorRoute);
app.use('/hospital', hospitalRoute);

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected..');
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected..');
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  connect();
  console.log(`Listening on port: ${port}`);
});
