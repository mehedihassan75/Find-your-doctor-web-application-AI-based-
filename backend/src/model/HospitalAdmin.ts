import mongoose, { Date, Types } from 'mongoose';
const Schema = mongoose.Schema;

interface IAppointArray {
  doctorName: string;
  doctorImage: string;
  chamberName: string;
  specialist: string;
  location: string;
  consultationDate: Date;
}
interface IUser {
  name: string;
  email: string;
  password: string;
  appointCart: IAppointArray;
}
const hospitalAdmin = new Schema({
  name: {
    type: String,
    required: true,
  },
  locationDiv: {
    type: String,
    required: true,
  },
  locationDis: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  doctorList: {
    type: Array, //ekhae doctor er id and tar available time dekhabe.
  },
  doctorReq: {
    type: Array, // ekhane firts e asbe then doctor list e jabe.
  },
});

export const Hospital = mongoose.model('Hospital', hospitalAdmin);
