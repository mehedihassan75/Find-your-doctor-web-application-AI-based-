import { NextFunction, Request, Response } from 'express';
import { Hospital } from '../model/HospitalAdmin';
import { Doctor } from '../model/Doctor';
import { User } from '../model/User';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';

export const signup = async (req: Request, res: Response) => {
  const hospital = new Hospital(req.body);
  // console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(hospital.password, salt);
    hospital.password = hash;
    await hospital.save();
    res.send(hospital);
  } catch (err: any) {
    console.log(err.message);
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userIsExist = await Hospital.findOne({ email });
  if (userIsExist) {
    const chkPass = bcrypt.compareSync(password, userIsExist.password);
    if (chkPass) {
      const token = jwt.sign({ level: 'hospital', _id: userIsExist._id }, process.env.JWTSECRET, {
        expiresIn: '8h',
      });

      res.cookie('loginfo', token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 500),
        httpOnly: true,
        sameSite: 'lax',
      });
      return res.status(200).json({ message: 'login success', userType: 'hospital' });
    }

    return res.status(400).json({ message: 'pass or email is not valid' });
  }

  return res.status(400).json({ message: 'pass or email is not valid' });
};

export const logout = async (req: Request, res: Response) => {
  console.log('logging out..');
  const cookies = req.headers.cookie;
  const header = cookies?.split('=')[1];
  if (!header) {
    return res.status(400).json({ message: 'unknown user in logout' });
  }

  res.clearCookie(`loginfo`);
  req.cookies['loginfo'] = '';

  res.status(200).json({ message: 'successfully logout.' });
};

export const getHospital = async (req: Request, res: Response) => {
  try {
    const users = await Hospital.findOne({ _id: req.params.hospitalId });
    res.send(users);
  } catch (err: any) {
    console.log(err.message);
  }
};

/////////////

export const ourDoctors = async (req: Request, res: Response) => {
  try {
    const users = await Hospital.findById({ _id: req.params.hospitalId });
    let doctors;
    if (users) {
      doctors = users.doctorList;
    }
    let doctorLi: any[] = [];
    if (doctors) {
      for (let i = 0; i < doctors.length; i++) {
        const doctorDoc = await Doctor.findById({ _id: doctors[i] });
        if (doctorDoc) doctorLi.push(doctorDoc);
      }
    }

    return res.send(doctorLi);
  } catch (er: any) {
    console.log(er.message);
  }
};
export const cvDraft = async (req: Request, res: Response) => {
  const users = await Hospital.findById({ _id: req.params.hospitalId });
  let doctors;
  if (users) {
    doctors = users.doctorReq;
  }
  let doctorList: any[] = [];
  if (doctors) {
    for (let i = 0; i < doctors.length; i++) {
      const doctorDoc = await Doctor.findById({ _id: doctors[i] });
      if (doctorDoc) doctorList.push(doctorDoc);
    }
  }
  // console.log(doctorList);
  return res.send(doctorList);
};
export const approve = async (req: Request, res: Response) => {
  const { doctorId } = req.body;
  const users = await Hospital.findById({ _id: req.params.hospitalId });

  let doctorReq;
  let doctorList;
  if (users) {
    doctorReq = [...users.doctorReq];
    doctorList = [...users.doctorList];
  }
  const newList = doctorReq.filter((data) => data !== doctorId);

  let newApproveList;
  if (newList) {
    newApproveList = [...doctorList, doctorId];
  }

  await Hospital.findOneAndUpdate({ _id: req.params.hospitalId }, { doctorList: newApproveList, doctorReq: newList });
  res.send('Successfully Approved.');
};
export const reject = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.body;

    const users = await Hospital.findById({ _id: req.params.hospitalId });

    let doctorReq;
    if (users) {
      doctorReq = [...users.doctorReq];
    }
    const newList = doctorReq.filter((data) => data !== doctorId);

    // console.log(newList);
    await Hospital.findOneAndUpdate({ _id: req.params.hospitalId }, { doctorReq: newList });

    res.send('Successfully Declined.');
  } catch (er: any) {
    console.log(er.message);
  }
};
export const fireDoc = async (req: Request, res: Response) => {
  const { doctorId } = req.body;
  const users = await Hospital.findById({ _id: req.params.hospitalId });

  let doctorList;
  if (users) {
    doctorList = [...users.doctorList];
  }
  const newList = doctorList.filter((data) => data !== doctorId);

  let newApproveList;
  if (newList) {
    newApproveList = [...newList];
  }
  newApproveList.push(doctorId);

  await Hospital.findOneAndUpdate({ _id: req.params.hospitalId }, { doctorList: newList });
  res.send('Successfully Fired.');
};

//////////

export const getUsersForBlood = async (req: Request, res: Response) => {
  const { locationDiv, locationDis, bloodGroup } = req.query as {
    locationDiv?: string;
    locationDis?: string;
    bloodGroup?: string;
  };

  const query: any = {};
  if (locationDis) query['locationDis'] = locationDis;
  if (locationDiv) query['locationDiv'] = locationDiv;
  if (bloodGroup) query['bloodGroup'] = bloodGroup;

  // console.log(req.userInfo);
  try {
    const users = await User.find(query);
    res.send(users);
  } catch (err: any) {
    console.log(err.message);
  }
};

export const doctorsCV = async (req: Request, res: Response) => {
  try {
    const docotrsCvDoc = await Hospital.find({ _id: req.userInfo?._id });
    // console.log(docotrsCvDoc);
    return res.status(200).send(docotrsCvDoc[0]?.doctorReq);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const doctorsList = async (req: Request, res: Response) => {
  try {
    const docotrsCvDoc = await Hospital.find({ _id: req.userInfo?._id });
    return res.status(200).send(docotrsCvDoc[0]?.doctorList);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const getDoctorByID = async (req: Request, res: Response) => {
  const { doctorId: _id } = req.params;
  try {
    const doctor = await Doctor.findOne({ _id });
    // console.log(doctor);
    res.status(200).send(doctor);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const approveDoctor = async (req: Request, res: Response) => {
  const { doctorId } = req.body;
  try {
    const getHospital = await Hospital.findOne({ _id: req.userInfo?._id });
    const getdoctorReq = getHospital?.doctorReq;
    const getdoctorList = getHospital?.doctorList;

    let udpatedoctorReq: any[] = [];
    let updatedoctorList: any[] = [];

    if (getdoctorReq) {
      udpatedoctorReq = [...getdoctorReq];
      udpatedoctorReq = udpatedoctorReq.filter((data) => data !== doctorId);
    }
    if (getdoctorList) {
      updatedoctorList = [...getdoctorList, doctorId];
    }

    await Hospital.findOneAndUpdate({ _id: req.userInfo?._id }, { doctorReq: [...udpatedoctorReq], doctorList: [...updatedoctorList] });
    res.status(200).json({ message: 'successfully recruited' });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};
