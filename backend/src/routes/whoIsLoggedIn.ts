import { Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const whoIsLoggedIn = express.Router();
whoIsLoggedIn.get('/', (req: Request, res: Response) => {
  const cookies = req.headers.cookie;
  const header = cookies?.split('=')[1];
  console.log('header :', req.headers);
  if (!header) {
    return res.send({ userType: 'empty', userId: '*****' });
  }
  try {
    const isValid = jwt.verify(String(header), process.env.JWTSECRET);
    return res.send({ userType: isValid.level, userId: isValid._id });
  } catch (err) {
    res.status(400).json({ message: '' });
  }
});

export default whoIsLoggedIn;
