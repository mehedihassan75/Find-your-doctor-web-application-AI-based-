import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  doctorGetHospitals,
  doctorGetUserForBlood,
  doctorRequestCancel,
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
import ApplyNowCard from "./Card/ApplyNowCard";
import { ModalControl } from "../../ContextAPI";
import WhereIApplyCard from "./Card/WhereIApplyCard";
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

const WhereIApply = () => {
  const [form] = Form.useForm();
  const [getHospitals, setHospitals] = useState([]);
  const [totalHospital, setTotalHospital] = useState(0);
  const { userId } = useContext(ModalControl);
  const onFinish = async (values) => {
    const { data } = await doctorGetUserForBlood({
      locationDiv: values.address[0],
      locationDis: values.address[1],
      bloodGroup: values.address[2],
    });
    console.log("Received values of form: ", data);
  };

  const onApplyNow = async (hospitalId) => {
    const { data } = await doctorRequestCancel(hospitalId);
    const Res = await doctorGetHospitals();
    setHospitals(Res.data);
    console.log(data);
    alert(data.message);
  };

  const getBlood = useCallback(async () => {
    const { data } = await doctorGetHospitals();

    setHospitals(data);
    console.log(data);
  }, []);

  useEffect(() => {
    // setTotalHospital(Date.now());
    getBlood();
  }, [getBlood]);

  return (
    <div style={{ paddingLeft: 20, height: "100%", overflow: "auto" }}>
      {/* <FilterWrapper
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="address"
          label="Filter"
          rules={[
            {
              type: "array",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
        <SearchBarButton {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </SearchBarButton>
      </FilterWrapper> */}
      <div style={{ display: "flex", flexWrap: "wrap", alignSelf: "center" }}>
        {getHospitals.length > 0
          ? getHospitals.map(
              (data) =>
                data.doctorReq.includes(userId) && (
                  <WhereIApplyCard onClick={onApplyNow} userData={data} />
                )
            )
          : "No User Available."}
      </div>
    </div>
  );
};

export default WhereIApply;
