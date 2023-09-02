import { NextFunction, Request, Response } from 'express';
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
// declare namespace Express {
//   export interface Request {
//     tenant?: string;
//   }
// }

const validateDoctor = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userInfo?.level !== 'doctor') {
      return res.status(400).send({ message: 'Only Doctor can apply in hospital' });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'unknown user' });
  }
};

export default validateDoctor;
