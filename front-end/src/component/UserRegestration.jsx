import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Modal,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { createUserAccountApi } from "../api/userApi/userApi";
const { Option } = Select;
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
const UserRegestration = ({
  onUserRegestrationModal,
  userRegestration,
  setUserOpen,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await createUserAccountApi(values);
    onUserRegestrationModal();
    setUserOpen(true);
    alert("Registration Successfull");
    // console.log("Received values of form: ", values);
  };
  return (
    <Modal
      title="User Registration"
      open={userRegestration}
      onOk={onUserRegestrationModal}
      onCancel={onUserRegestrationModal}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          // residence: ["division", "district"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="bloodGroup"
          label="Blood Group"
          rules={[
            {
              required: true,
              message: "Please select blood group!",
            },
          ]}
        >
          <Select placeholder="select your blood group">
            <Option value="A+">A+</Option>
            <Option value="A-">A-</Option>
            <Option value="B+">B+</Option>
            <Option value="B-">B-</Option>
            <Option value="O+">O+</Option>
            <Option value="O-">O-</Option>
            <Option value="AB+">AB+</Option>
            <Option value="AB-">AB-</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UserRegestration;
