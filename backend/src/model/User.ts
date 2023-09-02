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
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
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
  doctorBookmark: {
    type: [],
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', userSchema);
