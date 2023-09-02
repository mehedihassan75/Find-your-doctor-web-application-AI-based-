import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

export const createHospitalAccountApi = async (doctorRegData) => {
  console.log(doctorRegData);
  const { email, name, password, address, phone } = doctorRegData;

  const filteredData = {
    phone,
    password,
    name,
    email,
    locationDiv: address[0],
    locationDis: address[1],
  };
  console.log(filteredData);
  const createDoctorAccount = await axiosInstance.post(
    "/hospital/signup",
    filteredData
  );
  console.log(filteredData);

  return createDoctorAccount;
};

export const loginHospital = async (hospitalInfo) => {
  const loginHospitalInfo = await axiosInstance.post(
    "/hospital/login",
    hospitalInfo
  );
  return loginHospitalInfo;
};

export const logout = async () => {
  const logOut = await axiosInstance.post("/hospital/logout");

  return logOut;
};

export const doctorGetBloodUserById = async (userId) => {
  const getResponse = await axiosInstance.get(
    `/doctor/getuserforblood/${userId}`
  );
  return getResponse;
};

export const hospitalGetUserForBlood = async (userQuery) => {
  if (userQuery !== undefined) {
    const { locationDiv, locationDis, bloodGroup } = userQuery;
    const query = `?locationDiv=${locationDiv ? locationDiv : ""}&locationDis=${
      locationDis ? locationDis : ""
    }&bloodGroup=${bloodGroup ? bloodGroup : ""}`;

    console.log(query);
    const getResponse = await axiosInstance.get(
      `/hospital/getUsersForBlood/${query}`
    );
    return getResponse;
  } else {
    const getResponse = await axiosInstance.get(`/hospital/getUsersForBlood`);
    return getResponse;

    console.log(getResponse.data);
  }
};

export const ourDoctors = async (userId) => {
  const res = axiosInstance.get(`/hospital/ourdoc/${userId}`);
  return res;
};
export const cvDraft = async (hospitalId) => {
  const res = axiosInstance.post(`/hospital/cvdraft/${hospitalId}`);
  return res;
};
export const approveRequest = async ({ doctorId, userId }) => {
  const res = axiosInstance.post(`/hospital/approve/${userId}`, { doctorId });
  return res;
};
export const rejectRequest = async ({ doctorId, userId }) => {
  const res = axiosInstance.post(`/hospital/reject/${userId}`, { doctorId });
  return res;
};
export const fireDoctor = async ({ doctorId, userId }) => {
  const res = axiosInstance.post(`/hospital/fire/${userId}`, { doctorId });
  return res;
};
export const getHospitalInfo = async (hospitalId) => {
  const doctorLog = await axiosInstance.get(
    `/hospital/getHospital/${hospitalId}`
  );
  return doctorLog;
};
