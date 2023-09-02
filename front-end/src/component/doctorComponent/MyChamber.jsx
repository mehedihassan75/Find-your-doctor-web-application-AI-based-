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
import ApplyNowCard from "./Card/ApplyNowCard";
import { ModalControl } from "../../ContextAPI";
import MyCHamberCard from "./Card/MyChamberCard";
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

const MyCHamber = () => {
  const [form] = Form.useForm();
  const [getHospitals, setHospitals] = useState([]);
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
    const { data } = await doctorResignJob(hospitalId);
    const Res = await doctorGetHospitals();
    setHospitals(Res.data);

    alert(data.message);
  };

  const getBlood = useCallback(async () => {
    const { data } = await doctorGetHospitals();
    setHospitals(data);
  }, []);

  useEffect(() => {
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
                data.doctorList.includes(userId) && (
                  <MyCHamberCard onClick={onApplyNow} userData={data} />
                )
            )
          : "No User Available."}
      </div>
    </div>
  );
};

export default MyCHamber;
