import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  doctorGetHospitals,
  doctorGetUserForBlood,
  doctorRequestForJob,
  doctorResignJob,
} from "../../api/doctorApi/doctorApi";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import NeedBloodCard from "./Card/NeedBloodCard";
import styled from "styled-components";
import { ModalControl } from "../../ContextAPI";

import OurDoctorsCard from "./Card/OurDoctorsCard";
import { fireDoctor, ourDoctors } from "../../api/hospitalApi/hospitalApi";
const residences = [
  {
    value: "Barishal",
    label: "Barishal",
    children: [
      {
        value: "Barguna",
        label: "Barguna",
      },
      {
        value: "Barishal",
        label: "Barishal",
      },
      {
        value: "Bhola",
        label: "Bhola",
      },
      {
        value: "Jhalokati",
        label: "Jhalokati",
      },
      {
        value: "Patuakhali",
        label: "Patuakhali",
      },
      {
        value: "Pirojpur",
        label: "Pirojpur",
      },
    ],
  },
  {
    value: "Chattogram",
    label: "Chattogram",
    children: [
      {
        value: "Bandarban",
        label: "Bandarban",
      },
      {
        value: "Brahmanbaria",
        label: "Brahmanbaria",
      },
      {
        value: "Chandpur",
        label: "Chandpur",
      },
      {
        value: "Chattogram",
        label: "Chattogram",
      },
      {
        value: "Cumilla",
        label: "Cumilla",
      },
      {
        value: "Cox's Bazar",
        label: "Cox's Bazar",
      },
      {
        value: "Feni",
        label: "Feni",
      },
      {
        value: "Khagrachari",
        label: "Khagrachari",
      },
      {
        value: "Lakshmipur",
        label: "Lakshmipur",
      },
      {
        value: "Noakhali",
        label: "Noakhali",
      },
      {
        value: "Rangamati",
        label: "Rangamati",
      },
    ],
  },
  {
    value: "Dhaka",
    label: "Dhaka",
    children: [
      {
        value: "Dhaka",
        label: "Dhaka",
      },
      {
        value: "Faridpur",
        label: "Faridpur",
      },
      {
        value: "Gazipur",
        label: "Gazipur",
      },
      {
        value: "Gopalganj",
        label: "Gopalganj",
      },
      {
        value: "Kishoreganj",
        label: "Kishoreganj",
      },
      {
        value: "Madaripur",
        label: "Madaripur",
      },
      {
        value: "Manikganj",
        label: "Manikganj",
      },
      {
        value: "Munshiganj",
        label: "Munshiganj",
      },
      {
        value: "Narayanganj",
        label: "Narayanganj",
      },
      {
        value: "Narsingdi",
        label: "Narsingdi",
      },
      {
        value: "Rajbari",
        label: "Rajbari",
      },
      {
        value: "Shariatpur",
        label: "Shariatpur",
      },
      {
        value: "Tangail",
        label: "Tangail",
      },
    ],
  },
  {
    value: "Khulna",
    label: "Khulna",
    children: [
      {
        value: "Bagerhat",
        label: "Bagerhat",
      },
      {
        value: "Chuadanga",
        label: "Chuadanga",
      },
      {
        value: "Jashore",
        label: "Jashore",
      },
      {
        value: "Jhenaidah",
        label: "Jhenaidah",
      },
      {
        value: "Khulna",
        label: "Khulna",
      },
      {
        value: "Kushtia",
        label: "Kushtia",
      },
      {
        value: "Magura",
        label: "Magura",
      },
      {
        value: "Meherpur",
        label: "Meherpur",
      },
      {
        value: "Narail",
        label: "Narail",
      },
      {
        value: "Satkhira",
        label: "Satkhira",
      },
    ],
  },
  {
    value: "Rajshahi",
    label: "Rajshahi",
    children: [
      {
        value: "Bogura",
        label: "Bogura",
      },
      {
        value: "Joypurhat",
        label: "Joypurhat",
      },
      {
        value: "Naogaon",
        label: "Naogaon",
      },
      {
        value: "Natore",
        label: "Natore",
      },
      {
        value: "Nawabganj",
        label: "Nawabganj",
      },
      {
        value: "Pabna",
        label: "Pabna",
      },
      {
        value: "Rajshahi",
        label: "Rajshahi",
      },
      {
        value: "Sirajgonj",
        label: "Sirajgonj",
      },
    ],
  },
  {
    value: "Rangpur",
    label: "Rangpur",
    children: [
      {
        value: "Dinajpur",
        label: "Dinajpur",
      },
      {
        value: "Gaibandha",
        label: "Gaibandha",
      },
      {
        value: "Kurigram",
        label: "Kurigram",
      },
      {
        value: "Lalmonirhat",
        label: "Lalmonirhat",
      },
      {
        value: "Nilphamari",
        label: "Nilphamari",
      },
      {
        value: "Panchagarh",
        label: "Panchagarh",
      },
      {
        value: "Rangpur",
        label: "Rangpur",
      },
      {
        value: "Thakurgaon",
        label: "Thakurgaon",
      },
    ],
  },
  {
    value: "Sylhet",
    label: "Sylhet",
    children: [
      {
        value: "Habiganj",
        label: "Habiganj",
      },
      {
        value: "Maulvibazar",
        label: "Maulvibazar",
      },
      {
        value: "Sunamganj",
        label: "Sunamganj",
      },
      {
        value: "Sylhet",
        label: "Sylhet",
      },
    ],
  },
  {
    value: "Mymensingh",
    label: "Mymensingh",
    children: [
      {
        value: "Jamalpur",
        label: "Jamalpur",
      },
      {
        value: "Mymensingh",
        label: "Mymensingh",
      },
      {
        value: "Netrokona",
        label: "Netrokona",
      },
      {
        value: "Sherpur",
        label: "Sherpur",
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FilterWrapper = styled(Form)`
  display: flex;
  padding-top: 10px;
  margin-left: -80px;
  flex-direction: column;
  width: 400px;
`;
const SearchBarButton = styled(Form.Item)`
  margin-top: -18px;
`;

const OurDoctors = () => {
  const [form] = Form.useForm();
  const [doctors, setOurDoctors] = useState([]);
  const { userId } = useContext(ModalControl);
  const onFinish = async () => {
    const { data } = await ourDoctors(userId);
    setOurDoctors(data);
  };

  const onFireDoctor = async (doctorId) => {
    const { data } = await fireDoctor({ doctorId, userId });
    const Res = await ourDoctors(userId);
    setOurDoctors(Res.data);
    alert(data);
  };

  const getBlood = useCallback(async () => {
    const { data } = await ourDoctors(userId);
    setOurDoctors(data);
  }, [userId]);

  useEffect(() => {
    getBlood();
  }, [getBlood]);

  return (
    <div style={{ paddingLeft: 20, height: "100%", overflow: "auto" }}>
      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignSelf: "center",
        }}
      >
        {doctors.length > 0
          ? doctors.map((data) => (
              <OurDoctorsCard onClick={onFireDoctor} userData={data} />
            ))
          : "No User Available."}
      </div>
    </div>
  );
};

export default OurDoctors;
