import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

export const createDoctorAccountApi = async (doctorRegData) => {
  console.log("create doctor acc data: ", doctorRegData);
  const {
    currentProfession,
    email,
    gender,
    mbbsInstitue,
    name,
    password,
    specialist,
  } = doctorRegData.values;

  const filteredData = {
    password,
    name,
    specialist,
    gender,
    email,
    mbbsInstitue,
    currentProfession,
  };
  const createDoctorAccount = await axiosInstance.post(
    "/doctor/signup",
    filteredData
  );
  console.log(filteredData);

  return createDoctorAccount;
};

export const loginDoctor = async (doctorInfo) => {
  const loginDoctorAccount = await axiosInstance.post(
    "/doctor/login",
    doctorInfo
  );
  return loginDoctorAccount;
};

export const getDoctorInfo = async (doctorId) => {
  const doctorLog = await axiosInstance.get(`/doctor/doctor/${doctorId}`);
  return doctorLog;
};

export const logout = async () => {
  const logOut = await axiosInstance.post("/doctor/logout");

  return logOut;
};

export const doctorGetBloodUserById = async (userId) => {
  const getResponse = await axiosInstance.get(
    `/doctor/getuserforblood/${userId}`
  );
  return getResponse;
};

export const doctorGetUserForBlood = async (userQuery) => {
  if (userQuery !== undefined) {
    const { locationDiv, locationDis, bloodGroup } = userQuery;
    let blood;
    if (bloodGroup.length > 2)
      blood = `${bloodGroup[0]}${bloodGroup[1]}${encodeURIComponent(
        bloodGroup[2]
      )}`;
    else {
      blood = `${bloodGroup[0]}${encodeURIComponent(bloodGroup[1])}`;
    }
    console.log(blood);
    const query = `?locationDiv=${locationDiv}&locationDis=${locationDis}&bloodGroup=${blood}`;
    console.log(encodeURIComponent(query));
    console.log(query);
    const getResponse = await axiosInstance.get(
      `/doctor/getuserforblood/${encodeURIComponent(query)}`
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
