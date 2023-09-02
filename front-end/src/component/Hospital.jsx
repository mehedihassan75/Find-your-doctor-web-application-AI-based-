import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Divider, Tag, Button } from "antd";
import { ModalControl } from "../ContextAPI";
import { useNavigate } from "react-router-dom";
import MyChamber from "./doctorComponent/MyChamber";
import ApplyNow from "./doctorComponent/ApplyNow";
import WhereIApply from "./doctorComponent/WhereIApply";
// import NeedBLood from "./doctorComponent/NeedBLood";
import { getDoctorInfo, logout } from "../api/doctorApi/doctorApi";
// import NeedBloodCard from "./doctorComponent/Card/NeedBloodCard";
import NeedBLood from "./doctorComponent/NeedBLood";
import OurDoctors from "./hospitalComponent/OurDoctors";
import WhereIApplyCard from "./doctorComponent/Card/WhereIApplyCard";
import ReqDoctors from "./hospitalComponent/ReqDoctors";
import { getHospitalInfo } from "../api/hospitalApi/hospitalApi";

const HospitalWrapper = styled.div`
  display: flex;
  background-color: #fff;
`;
const Aside = styled.div`
  width: 30%;
  background-color: #fff;
  height: 100vh;
  /* padding: 10px; */

  h1,
  h2 {
    color: #0ca86d;
    /* line-height: 1; */
  }
  p {
    border-bottom: 1px solid #f4f7f6;
    padding-bottom: 20px;
    background-color: #f7f6eb;
  }
  .greetings {
    color: #b565a7;
  }
`;
const RightContent = styled.div`
  border-left: 8px solid #e7e5e5;
  width: 70%;
  background-color: #e5ecc9;
  height: 100vh;
`;
const UserGreetings = styled.div`
  padding: 15px;
  background-color: #ffffff;
  border-bottom: 1px solid;
`;

const UseInfoSide = styled.div`
  padding: 15px;
  padding-top: 50px;

  h5 {
    margin-bottom: 30px;
  }
`;

const DoctorNav = styled.div`
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const DoctorButton = styled(Button)`
  background-color: #23b423;
  min-width: 210px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const DetailsContent = styled.div`
  /* height: 100%; */
  height: 100%;
  overflow: auto;
  background-color: white;
`;

const columns = [
  {
    title: "",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    age: "Email",
    address: "abc@gmail.com",
  },
  {
    key: "2",
    name: "Jim Green",
    age: "Specialist",
    address: "Medicine",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: "MBBS",
    address: "Solimullah medical college",
  },
  {
    key: "4",
    name: "fd",
    age: "Gender",
    address: "Male",
  },
  {
    key: "4",
    name: "fd",
    age: "Current Profession",
    address: "Professor at SOlimullah Medicale college",
  },
];

const greetingsFunction = () => {
  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();
  if (hour > 5 && hour < 12) return "Morning";
  else if (hour === 12 && (min === 0 || min === 1)) return "Noon";
  else if (hour > 11 && hour < 18) return "Afternoon";
  else if (hour > 17 && hour < 19) return "Evening";
  else return "Night";
};
const Doctor = () => {
  const { userType, userId } = useContext(ModalControl);
  const navigate = useNavigate();
  if (userType === "empty" || userType === "") {
    navigate("/");
  }

  const [subMeu, setSubMenu] = useState("blood");
  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  const [userDetails, setUserDetails] = useState(data);
  const getUserDetails = useCallback(async () => {
    const { data } = await getHospitalInfo(userId);
    console.log("Good morning hospital", data);
    setUserDetails(data);
  }, [userId]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <HospitalWrapper>
      <Aside>
        <UserGreetings>
          <h1>Hello, </h1>
          <h2>{userDetails.name}</h2>
          <h4>
            Good <span className="greetings">{greetingsFunction()}</span>,
            <span> Hope you are fine</span>
          </h4>
        </UserGreetings>
        <UseInfoSide>
          <h5>User Details: </h5>
          <Table
            pagination={false}
            columns={columns}
            dataSource={[
              {
                key: "1",
                age: "Email",
                address: userDetails.email,
              },
              {
                key: "2",
                name: "Jim Green",
                age: "Division",
                address: `${userDetails.locationDiv}`,
                tags: ["loser"],
              },
              {
                key: "2",
                name: "Jim Green",
                age: "District",
                address: `${userDetails.locationDis}`,
                tags: ["loser"],
              },
              {
                key: "3",
                name: "Jim Green",
                age: "Phone",
                address: `${userDetails.phone}`,
                tags: ["loser"],
              },
            ]}
          />
        </UseInfoSide>
      </Aside>
      <RightContent>
        <DoctorNav>
          <DoctorButton
            type="primary"
            onClick={() => {
              setSubMenu("our_doctors");
            }}
          >
            Our Doctors
          </DoctorButton>
          <DoctorButton
            type="primary"
            onClick={() => {
              setSubMenu("req_doctors");
            }}
          >
            CV Inbox
          </DoctorButton>
          <DoctorButton
            type="primary"
            onClick={() => {
              setSubMenu("blood");
            }}
          >
            Need Blood
          </DoctorButton>
          <DoctorButton type="primary" onClick={onLogout}>
            Logout
          </DoctorButton>
        </DoctorNav>
        <DetailsContent>
          {subMeu === "blood" ? (
            <NeedBLood />
          ) : subMeu === "our_doctors" ? (
            <OurDoctors />
          ) : subMeu === "req_doctors" ? (
            <ReqDoctors />
          ) : null}
        </DetailsContent>
      </RightContent>
    </HospitalWrapper>
  );
};

export default Doctor;
