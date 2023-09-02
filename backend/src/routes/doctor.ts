import { Request, Response } from 'express';
import { Doctor } from '../model/Doctor';
import validateUser from '../validator/useValid';
import refreshToken from '../validator/refreshToken';
import validateDoctor from '../validator/validateDoctor';
import express from 'express';
import {
  getDoctors,
  getHospital,
  getSingleDoctor,
  getUsersForBlood,
  getUsersForBloodById,
  login,
  logout,
  rejectJob,
  requestForJob,
  resignjob,
  signup,
} from '../controller/doctorAction';

const doctorRoute = express.Router();
doctorRoute.get('/', (_: Request, res: Response) => {
  res.send('doctor route');
});
doctorRoute.post('/signup', signup);
doctorRoute.get('/getdoctors', refreshToken, validateUser, getDoctors);
doctorRoute.post('/login', login);
doctorRoute.post('/logout', validateUser, logout);
doctorRoute.get('/gethospitals', refreshToken, validateUser, validateDoctor, getHospital);
doctorRoute.post('/reqforjob/:hospitalId', refreshToken, validateUser, requestForJob);
doctorRoute.get('/getuserforblood', refreshToken, validateUser, getUsersForBlood);
doctorRoute.get('/getuserforblood/:userId', refreshToken, validateUser, validateDoctor, getUsersForBloodById);
doctorRoute.post('/canceljob/:hospitalId', refreshToken, validateUser, validateDoctor, rejectJob);
doctorRoute.post('/resignjob/:hospitalId', refreshToken, validateUser, validateDoctor, resignjob);
doctorRoute.get('/doctor/:doctorId', refreshToken, validateUser, validateDoctor, getSingleDoctor);
doctorRoute.get('ourdoctors');
export default doctorRoute;
