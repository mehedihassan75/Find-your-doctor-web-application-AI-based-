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

const validateHospital = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userInfo?.level !== 'hospital') {
      return res.status(400).send({ message: 'Only Hospital can see this page' });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'unknown user' });
  }
};

export default validateHospital;
