import express, { Request, Response } from 'express';
import validateUser from '../validator/useValid';
import refreshToken from '../validator/refreshToken';

import {
  getDoctorDetails,
  getDoctors,
  getHospital,
  getHospitalById,
  getHospitalWithDoctorDetails,
  getSymptom,
  getUserForBlood,
  getUsers,
  login,
  logout,
  signup,
} from '../controller/userAction';

const usrRouter = express.Router();
usrRouter.get('/', (_: Request, res: Response) => {
  res.send('user route');
});

usrRouter.post('/signup', signup);
usrRouter.get('/getUsers', refreshToken, validateUser, getUsers); //blood er jonnno korechi
usrRouter.post('/login', login);
usrRouter.post('/logout', validateUser, logout);
usrRouter.get('/getHospitalList', refreshToken, validateUser, getHospital); //query te hospital er divistion thakte pare
usrRouter.get('/getHospitalById/:hospitalId', refreshToken, validateUser, getHospitalById); //query te doctor specialist thakte pare
usrRouter.get('/getDoctorbasedOnSepcialist', refreshToken, validateUser, getDoctors); //query thakbe division wise.
usrRouter.get('/getUser/:userId', refreshToken, validateUser, getUserForBlood); //blood er jonno dorkar porbe. modal diye eta dekhabo amra.
usrRouter.post('/symptoms', getSymptom);
usrRouter.post('/getDocList', getHospitalWithDoctorDetails);
usrRouter.get('/doctor/:id', getDoctorDetails);

export default usrRouter;
