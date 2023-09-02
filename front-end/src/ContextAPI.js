import React, { createContext, useEffect, useState } from "react";
import { whoIsLogged } from "./api/whoIsLoggedIn/whoIsLoggedIn";

export const ModalControl = createContext({});

const ContextAPI = ({ children }) => {
  const [isUserOpen, setUserOpen] = useState(false);
  const [isDoctorOpen, setDoctorOpen] = useState(false);
  const [isHospitalOpen, setHospitalOpen] = useState(false);

  const [userType, setLoginLevel] = useState("");
  const [userId, setUserId] = useState("");

  const getUserType = async () => {
    const who = await whoIsLogged();
    console.log("Hello ", who.data);
    setLoginLevel(who.data.userType);
    setUserId(who.data.userId);
    // alert(who.data._id);
  };
  useEffect(() => {
    getUserType();
  });

  const onUser = () => {
    setUserOpen((prev) => !prev);
  };
  const onDoctor = () => {
    setDoctorOpen((prev) => !prev);
  };
  const onHospital = () => {
    setHospitalOpen((prev) => !prev);
  };

  return (
    <ModalControl.Provider
      value={{
        onUser,
        userId,
        onDoctor,
        setDoctorOpen,
        setUserOpen,
        setHospitalOpen,
        onHospital,
        isUserOpen,
        isDoctorOpen,
        isHospitalOpen,
        userType,
        setLoginLevel,
      }}
    >
      {children}
    </ModalControl.Provider>
  );
};

export default ContextAPI;
