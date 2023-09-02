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
const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  specialist: {
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
  mbbsInstitue: {
    type: String,
    required: true,
  },
  currentProfession: {
    type: String,
  },
  // Hospital Id Will be store in here.
  chamberList: {
    type: [String],
  },
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
