import { NextFunction, Request, Response } from 'express';
import { Doctor } from '../model/Doctor';
import { Hospital } from '../model/HospitalAdmin';
import { User } from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req: Request, res: Response) => {
  console.log('Hello hasan');
  const doctor = new Doctor(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(doctor.password, salt);
    doctor.password = hash;
    await doctor.save();
    res.send(doctor);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const userIsExist = await Doctor.findOne({ email });
  // console.log(userIsExist);
  if (userIsExist) {
    const chkPass = bcrypt.compareSync(password, userIsExist.password);
    console.log('password chk: ', chkPass);
    if (chkPass) {
      const token = jwt.sign({ level: 'doctor', _id: userIsExist._id }, process.env.JWTSECRET, {
        expiresIn: '8h',
      });

      // res.cookie(String(userIsExist._id), token, {
      //   path: '/',
      //   expires: new Date(Date.now() + 1000 * 30),
      //   httpOnly: true,
      //   sameSite: 'lax',
      // });

      res.cookie('loginfo', token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 500),
        // httpOnly: true,
        origin: 'http://localhost:3000',
        // sameSite: 'lax',
      });
      console.log(token);
      return res.status(200).json({ message: 'login success', userType: 'doctor' });
    }

    return res.status(400).json({ message: 'pass or email is not valid' });
  }

  return res.status(400).json({ message: 'pass or email is not valid' });
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.headers.cookie;
  const header = cookies?.split('=')[1];
  if (!header || !req.userInfo) {
    return res.status(400).json({ message: 'unknown user' });
  }

  res.clearCookie(`loginfo`);
  req.cookies['loginfo'] = '';

  res.status(200).json({ message: 'successfully logout.' });
};

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (err: any) {
    console.log(err.message);
  }
};
export const getSingleDoctor = async (req: Request, res: Response) => {
  try {
    const doctorDoc = await Doctor.findOne({ _id: req.params.doctorId });
    res.send(doctorDoc);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getHospital = async (req: Request, res: Response) => {
  const { locationDiv, locationDis } = req.query as {
    locationDiv?: string;
    locationDis?: string;
  };
  let query: any = {};
  console.log(locationDis);
  if (locationDiv) query['locationDiv'] = locationDiv;
  if (locationDis) query['locationDis'] = locationDis;

  try {
    const hospitalDocs = await Hospital.find(query);
    res.send(hospitalDocs);
  } catch (err) {
    res.json({ message: 'problem in get hostpital doctor' });
  }
};

export const requestForJob = async (req: Request, res: Response) => {
  const userId = req.userInfo?._id;
  // console.log('doc req list', req.params);
  const { hospitalId: _id } = req.params;
  try {
    const sendRes: any = await Hospital.find({ _id });
    const updateDoctorList = [...sendRes[0].doctorReq];
    const approveListCheck = [...sendRes[0].doctorList];

    const chkAlreadyReques = updateDoctorList.filter((data) => data === userId);
    if (chkAlreadyReques.length > 0) {
      return res.status(400).json({ message: 'request already sent' });
    }

    const checkAlreadyAdded = approveListCheck.filter((data) => data === userId);
    if (checkAlreadyAdded.length > 0) {
      return res.status(400).json({ message: 'already member in this hospital' });
    }
    updateDoctorList.push(userId);
    await Hospital.findOneAndUpdate({ _id }, { doctorReq: [...updateDoctorList] });

    res.status(200).json({ message: 'request sent.' });
  } catch (err: any) {
    console.log('here problem ', err.message);
    res.send(err.message);
  }
};
export const rejectJob = async (req: Request, res: Response) => {
  const userId = req.userInfo?._id;
  // console.log('doc req list', req.params);
  const { hospitalId: _id } = req.params;
  try {
    const sendRes: any = await Hospital.find({ _id });
    const updateDoctorList = [...sendRes[0].doctorReq];
    const approveListCheck = [...sendRes[0].doctorList];

    const chkAlreadyReques = updateDoctorList.filter((data) => data === userId);
    if (chkAlreadyReques.length > 0) {
      const filterUser = updateDoctorList.filter((data) => data !== userId);
      await Hospital.findOneAndUpdate({ _id }, { doctorReq: [...filterUser] });
      return res.status(200).json({ message: 'successfully removed' });
    }
    res.status(400).json({ message: 'Cance Failed.' });
  } catch (err: any) {
    console.log('here problem ', err.message);
    res.send(err.message);
  }
};
export const resignjob = async (req: Request, res: Response) => {
  const userId = req.userInfo?._id;
  // console.log('doc req list', req.params);
  const { hospitalId: _id } = req.params;
  try {
    const sendRes: any = await Hospital.find({ _id });
    const updateDoctorList = [...sendRes[0].doctorReq];
    const approveListCheck = [...sendRes[0].doctorList];

    const chkAlreadyReques = approveListCheck.filter((data) => data === userId);
    console.log('user is FounD', sendRes);
    if (chkAlreadyReques.length > 0) {
      const filterUser = approveListCheck.filter((data) => data !== userId);
      await Hospital.findOneAndUpdate({ _id }, { doctorList: [...filterUser] });
      return res.status(200).json({ message: 'successfully resigned' });
    }
    res.status(400).json({ message: 'resign Failed.' });
  } catch (err: any) {
    console.log('here problem ', err.message);
    res.send(err.message);
  }
};

export const getUsersForBlood = async (req: Request, res: Response) => {
  const { locationDiv, locationDis, bloodGroup } = req.query as {
    locationDiv?: string;
    locationDis?: string;
    bloodGroup?: string;
  };
  console.log('query', req.query);
  const query: any = {};
  if (locationDis) query['locationDis'] = locationDis;
  if (locationDiv) query['locationDiv'] = locationDiv;
  if (bloodGroup) query['bloodGroup'] = bloodGroup;
  let blood: string;
  if (bloodGroup) {
    if (bloodGroup.length > 2) blood = `${bloodGroup[0]}${bloodGroup[1]}${encodeURIComponent(bloodGroup[2])}`;
    else {
      blood = `${bloodGroup[0]}${encodeURIComponent(bloodGroup[1])}`;
    }
  }

  console.log();
  try {
    const users = await User.find(query);
    res.send(users);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getUsersForBloodById = async (req: Request, res: Response) => {
  const { userId: _id } = req.params;
  try {
    const gettingUser = await User.find({ _id });
    res.status(200).send(gettingUser);
  } catch (err: any) {
    res.send(err.message);
  }
};
