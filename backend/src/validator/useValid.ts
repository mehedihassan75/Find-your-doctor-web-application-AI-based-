import { NextFunction, Request, Response } from 'express';
import { User } from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// declare module 'express-serve-static-core' {
//   interface Request {
//     userInfo?: { _id: string | undefined; level: string | undefined };
//   }
// }
declare namespace Express {
  interface Request {
    userInfo?: { _id: string | undefined; level: string | undefined };
  }
}

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  //   const header = req.headers[`authorization`]?.split(' ')[1];
  const cookies = req.headers.cookie;
  const header = cookies?.split('=')[1];
  if (!header) {
    return res.status(400).json({ message: 'unknown user' });
  }
  try {
    const isValid = jwt.verify(String(header), process.env.JWTSECRET);
    req.userInfo = isValid;
    next();
  } catch (err) {
    res.status(400).json({ message: 'unknown user' });
  }
};

export default validateUser;
