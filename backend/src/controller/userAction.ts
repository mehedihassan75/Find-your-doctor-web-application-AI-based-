import { NextFunction, Request, Response } from 'express';
import { User } from '../model/User';
import { Hospital } from '../model/HospitalAdmin';
import { Doctor } from '../model/Doctor';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getAiResult from '../../src/AISection';

export const signup = async (req: Request, res: Response) => {
  const user = new User(req.body);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  try {
    await user.save();
    console.log('created');
    res.send(user);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userIsExist = await User.findOne({ email });
  if (userIsExist) {
    const chkPass = bcrypt.compareSync(password, userIsExist.password);
    if (chkPass) {
      const token = jwt.sign({ level: 'user', _id: userIsExist._id }, process.env.JWTSECRET, {
        expiresIn: '8h',
      });

      if (req.cookies['loginfo']) {
        req.cookies['loginfo'] = '';
      }

      res.cookie('loginfo', token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 500),
        httpOnly: true,
        sameSite: 'lax',
      });

      return res.status(200).json({ message: 'login success', userType: 'user' });
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
    res.json({ message: 'problem in get hostpital' });
  }
};

export const getHospitalById = async (req: Request, res: Response) => {
  console.log(req.query);
  const { hospitalId: _id } = req.params;

  let query: any = { _id };

  try {
    const hospitalDocs = await Hospital.find(query);
    res.send(hospitalDocs);
  } catch (err) {
    res.json({ message: 'problem in get hostpital' });
  }
};

export const getDoctors = async (req: Request, res: Response) => {
  console.log(req.query);
  const { hospitalId: _id } = req.params;
  console.log('hola');
  const { specialist } = req.query as {
    specialist?: string;
  };

  let query: any = {};
  if (specialist) query['specialist'] = specialist;

  try {
    const DoctorDocs = await Doctor.find(query);
    res.send(DoctorDocs);
  } catch (err) {
    res.json({ message: 'problem in get doctor' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { locationDiv, locationDis, bloodGroup } = req.query as {
    locationDiv?: string;
    locationDis?: string;
    bloodGroup?: string;
  };

  const query: any = {};
  if (locationDis) query['locationDis'] = locationDis;
  if (locationDiv) query['locationDiv'] = locationDiv;
  if (bloodGroup) query['bloodGroup'] = bloodGroup;

  console.log(req.userInfo);
  try {
    const users = await User.find(query);
    res.send(users);
  } catch (err: any) {
    console.log(err.message);
  }
};
export const getUserForBlood = async (req: Request, res: Response) => {
  console.log(req.userInfo);
  const { userId: _id } = req.params;
  try {
    const user = await User.find({ _id });
    res.send(user);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getSymptom = async (req: Request, res: Response) => {
  const result = getAiResult(req.body);
  console.log(result);
  res.send(result);
};

export const getHospitalWithDoctorDetails = async (req: Request, res: Response) => {
  const allDoctorDocs = await Hospital.find();
  const getSuggestion = req.body.suggestions;
  console.log('helllllo', getSuggestion);

  for (let i = 0; i < allDoctorDocs.length; i++) {
    let doctorList: any[] = [];
    for (let j = 0; j < allDoctorDocs[i].doctorList.length; j++) {
      const doctorDoc = await Doctor.findById({ _id: allDoctorDocs[i].doctorList[j] });

      console.log(doctorDoc?.specialist, ' ', getSuggestion);
      if (doctorDoc?.specialist === getSuggestion) {
        console.log('hlwo mera ', doctorDoc?.specialist, getSuggestion);
        doctorList.push(doctorDoc);
      }
    }
    allDoctorDocs[i].doctorList = [...doctorList];
  }
  let filterHospital: any[] = [];
  for (let i = 0; i < allDoctorDocs.length; i++) {
    if (allDoctorDocs[i].doctorList.length > 0) {
      filterHospital.push(allDoctorDocs[i]);
    }
  }
  res.send(filterHospital);
};

export const getDoctorDetails = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const docDetailstDoc = await Doctor.findById({ _id });
    return res.send(docDetailstDoc);
  } catch (err: any) {
    console.log(err.message);
  }
};
