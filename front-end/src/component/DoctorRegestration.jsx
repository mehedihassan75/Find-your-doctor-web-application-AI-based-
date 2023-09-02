import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { createDoctorAccountApi } from "../api/doctorApi/doctorApi";
const { Option } = Select;

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
const DoctorRegestration = ({
  onDoctorRegModal,
  doctorRegestration,
  setDoctorOpen,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await createDoctorAccountApi({
      values,
    });
    alert("Registration Successful");
    onDoctorRegModal();
    setDoctorOpen(true);
    // console.log("Received values of form: ", values);
  };

  return (
    <Modal
      title="Doctor Registration"
      open={doctorRegestration}
      onOk={onDoctorRegModal}
      onCancel={onDoctorRegModal}
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
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender",
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
          name="mbbsInstitue"
          label="MBBS Institue"
          // tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your Institue!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="specialist"
          label="Specialist Type"
          rules={[
            {
              required: true,
              message: "Specialist type",
            },
          ]}
        >
          <Select placeholder="select specialist type">
            <Option value="Dermatologist">Dermatologist</Option>
            <Option value="Gastroentrologist">Gastroentrologist</Option>
            <Option value="Hepatologist">Hepatologist</Option>
            <Option value="Medicine">Medicine</Option>
            <Option value="Endocrinologist">Endocrinologist</Option>
            <Option value="Neurologist">Neurologist</Option>
            <Option value="Cardiologist">Cardiologist</Option>
            <Option value="Vascular_specalist">Vascular_specalist</Option>
            <Option value="Orthopedics">Orthopedics</Option>
            <Option value="Audiologist">Audiologist</Option>
            <Option value="Urologist">Urologist</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="currentProfession"
          label="Current Profession"
          rules={[
            {
              required: true,
              message: "Please input Intro",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
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
export default DoctorRegestration;
