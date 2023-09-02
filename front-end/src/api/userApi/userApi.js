import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

export const createUserAccountApi = async (userData) => {
  console.log("create user acc data: ", userData);
  const { address, bloodGroup, email, gender, name, password, phone } =
    userData;

  const filteredData = {
    name,
    email,
    gender,
    password,
    locationDiv: address[0],
    locationDis: address[1],
    bloodGroup,
    phone,
  };
  const createUserAcc = await axiosInstance.post("/user/signup", filteredData);
  console.log(filteredData);

  return createUserAcc;
};

export const loginUser = async (doctorInfo) => {
  const loginUserAccount = await axiosInstance.post("/user/login", doctorInfo);
  return loginUserAccount;
};

export const getSymptom = async (symp) => {
  const userSymptom = await axiosInstance.post(`/user/symptoms`, symp);
  return userSymptom;
};

export const getHospitalWithDocListBySymptoms = async (suggestions) => {
  const result = await axiosInstance.post(`/user/getDocList`, { suggestions });
  return result;
};

export const getDoctorDetails = async (userId) => {
  const getResponse = await axiosInstance.get(`/user/doctor/${userId}`);
  return getResponse;
};

export const getUserInfo = async (userId) => {
  const response = await axiosInstance.get(`/user/getUser/${userId}`);
  return response;
};

export const doctorGetUserForBlood = async (userQuery) => {
  if (userQuery !== undefined) {
    const { locationDiv, locationDis, bloodGroup } = userQuery;
    const query = `?locationDiv=${locationDiv ? locationDiv : ""}&locationDis=${
      locationDis ? locationDis : ""
    }&bloodGroup=${bloodGroup ? bloodGroup : ""}`;
    const getResponse = await axiosInstance.get(
      `/doctor/getuserforblood/${query}`
    );
    return getResponse;
  } else {
    const getResponse = await axiosInstance.get(`/doctor/getuserforblood`);
    return getResponse;

    console.log(getResponse.data);
  }
};

export const doctorGetHospitals = async (hospitalQuery) => {
  if (hospitalQuery !== undefined) {
    const { locationDis, locationDiv } = hospitalQuery;
    const query = `?locationDiv=${
      locationDiv ? locationDiv : null
    }&locationDis=${locationDis ? locationDis : null}`;
    const getResponse = await axiosInstance.get(`/doctor/gethospitals${query}`);
    return getResponse;
  } else {
    const getResponse = await axiosInstance.get(`/doctor/gethospitals`);
    return getResponse;
  }
};

export const doctorRequestForJob = async (hospitalId) => {
  const res = await axiosInstance.post(`/doctor/reqforjob/${hospitalId}`);
  return res;
};

export const doctorRequestCancel = async (hospitalId) => {
  const res = await axiosInstance.post(`/doctor/canceljob/${hospitalId}`);
  return res;
};

export const doctorResignJob = async (hospitalId) => {
  const res = await axiosInstance.post(`/doctor/resignjob/${hospitalId}`);
  return res;
};
