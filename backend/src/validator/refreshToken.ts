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

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  const prevTOken = cookies?.split('=')[1];
  if (!prevTOken) {
    return res.status(400).json({ message: 'unknown user.' });
  }

  try {
    const { level, _id } = jwt.verify(String(prevTOken), process.env.JWTSECRET);
    res.clearCookie(`loginfo`);
    req.cookies[`loginfo`] = '';

    const token = jwt.sign({ level, _id }, process.env.JWTSECRET, {
      expiresIn: '8h',
    });

    res.cookie('loginfo', token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 500),
      httpOnly: true,
      sameSite: 'lax',
    });

    console.log('token: ', prevTOken);
    console.log('refresh token: ', token);

    req.userInfo = { ...token };
    next();
  } catch (err) {
    res.status(400).json({ message: 'token check failed.' });
  }
};
//amra middleware e refreshtoken dibo then verify token dibo
export default refreshToken;
