import { Request, Response } from 'express';
import express from 'express';
import validateUser from '../validator/useValid';
import refreshToken from '../validator/refreshToken';
import validateHospital from '../validator/validateHospital';

import {
  approve,
  approveDoctor,
  cvDraft,
  doctorsCV,
  doctorsList,
  fireDoc,
  getDoctorByID,
  getHospital,
  getUsersForBlood,
  login,
  logout,
  ourDoctors,
  reject,
  signup,
} from '../controller/hospitalAction';

const hospitalRoute = express.Router();
hospitalRoute.get('/', (req: Request, res: Response) => {
  res.send('Hospital Route.');
});

hospitalRoute.post('/signup', signup);
hospitalRoute.get('/getHospital/:hospitalId', refreshToken, validateUser, getHospital);
hospitalRoute.post('/login', login);
hospitalRoute.post('/logout', logout);
hospitalRoute.get('/getUsersForBlood', refreshToken, validateUser, getUsersForBlood);
hospitalRoute.get('/doctorsRecruite', refreshToken, validateUser, validateHospital, doctorsCV);
hospitalRoute.get('/doctorsList', refreshToken, validateUser, validateHospital, doctorsList);
hospitalRoute.get('/doctorInfo/:doctorId', refreshToken, validateUser, validateHospital, getDoctorByID);
hospitalRoute.post('/approveDoctor', refreshToken, validateUser, validateHospital, approveDoctor);

hospitalRoute.get('/ourdoc/:hospitalId', ourDoctors);
hospitalRoute.post('/cvdraft/:hospitalId', cvDraft);
hospitalRoute.post('/approve/:hospitalId', approve);
hospitalRoute.post('/reject/:hospitalId', reject);
hospitalRoute.post('/fire/:hospitalId', fireDoc);

export default hospitalRoute;
