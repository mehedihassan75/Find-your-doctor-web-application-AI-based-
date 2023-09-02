import Typewriter from "typewriter-effect";
import { IoMailOutline, IoPowerOutline, IoStar } from "react-icons/io5";
import styled from "styled-components";
import { useContext, useState } from "react";
import { ModalControl } from "../ContextAPI";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Button, Checkbox, Form, Input, Image } from "antd";
import doctor_login from "../images/doctor_login.gif";
import hospital_login from "../images/hospital_login.gif";
import user_login from "../images/user_login.png";
import LandingPage from "../component/LandingPage";
import DoctorRegestration from "../component/DoctorRegestration";
import UserRegestration from "../component/UserRegestration";
import HospitalRegestration from "../component/HospitalRegestration";
import { loginDoctor } from "../api/doctorApi/doctorApi";
import { useNavigate } from "react-router-dom";
import { loginHospital } from "../api/hospitalApi/hospitalApi";
import { loginUser } from "../api/userApi/userApi";

const LogReg = styled(Button)`
  margin-right: 0.5rem;
  background-color: #0ca86d;
  font-weight: 600;
`;

const DoctorFormImageWrapper = styled(Form.Item)`
  display: flex;
  justify-content: center;
`;
function HomePage() {
  const navigate = useNavigate();
  const {
    onUser,
    onDoctor,
    onHospital,
    setDoctorOpen,
    setUserOpen,
    setHospitalOpen,
    isUserOpen,
    isDoctorOpen,
    isHospitalOpen,
    userType,
  } = useContext(ModalControl);
  const onFinishDoctor = async (values) => {
    const res = await loginDoctor(values);
    onDoctor();
    // console.log("Received values of form: ", values);
    console.log(res.data);
  };

  const onFinisHospital = async (values) => {
    console.log(values);
    const res = await loginHospital(values);
    onHospital();
    console.log(res.data);
  };
  const onFinishUser = async (values) => {
    await loginUser(values);
    onUser();
    // console.log("Received values of form: ", values);
  };
  // const onFinish = async (values) => {
  //   const res = await loginDoctor(values);
  //   // console.log("Received values of form: ", values);
  //   console.log(res.data);
  // };

  if (userType === "doctor") {
    navigate("/doctor");
  }
  if (userType === "hospital") {
    navigate("/hospital");
  }
  if (userType === "user") {
    navigate("/user");
  }

  const [doctorRegestration, setDoctorRegestration] = useState(false);
  const [userRegestration, setUserRegestration] = useState(false);
  const [hospitalRegestration, setHospitalRegestration] = useState(false);

  const onDoctorRegModal = () => {
    setDoctorRegestration((prev) => !prev);
    setDoctorOpen(false);
  };
  const onUserRegestrationModal = () => {
    setUserRegestration((prev) => !prev);
    setUserOpen(false);
  };
  const onHospitalRegestrationModal = () => {
    setHospitalRegestration((prev) => !prev);
    setHospitalOpen(false);
  };

  // console.log(useContext(ModalControl));
  return (
    <>
      <Modal
        // title="Hospital Registration"
        open={isHospitalOpen}
        onOk={onHospital}
        onCancel={onHospital}
        footer={null}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinisHospital}
        >
          <DoctorFormImageWrapper>
            <img width={200} src={hospital_login} alt="doctor logo" />
          </DoctorFormImageWrapper>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <LogReg
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </LogReg>

            <LogReg
              type="primary"
              // icon={<IoPowerOutline />}
              // loading={true}
              onClick={onHospitalRegestrationModal}
            >
              Registration
            </LogReg>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        // title="User Login"
        open={isUserOpen}
        onOk={onUser}
        onCancel={onUser}
        footer={null}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishUser}
        >
          <DoctorFormImageWrapper>
            <img width={200} src={user_login} alt="doctor logo" />
          </DoctorFormImageWrapper>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <LogReg
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </LogReg>

            <LogReg
              type="primary"
              // icon={<IoPowerOutline />}
              // loading={true}
              onClick={onUserRegestrationModal}
            >
              Registration
            </LogReg>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        // title="Doctor Login"
        open={isDoctorOpen}
        onOk={onDoctor}
        onCancel={onDoctor}
        footer={null}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishDoctor}
        >
          <DoctorFormImageWrapper>
            <img width={200} src={doctor_login} alt="doctor logo" />
          </DoctorFormImageWrapper>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <LogReg
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </LogReg>

            <LogReg
              type="primary"
              // loading={true}
              onClick={onDoctorRegModal}
            >
              Register
            </LogReg>
          </Form.Item>
        </Form>
      </Modal>
      <LandingPage
        onUser={onUser}
        onHospital={onHospital}
        onDoctor={onDoctor}
      />
      <DoctorRegestration
        doctorRegestration={doctorRegestration}
        onDoctorRegModal={onDoctorRegModal}
        setDoctorOpen={setDoctorOpen}
      />
      <UserRegestration
        userRegestration={userRegestration}
        onUserRegestrationModal={onUserRegestrationModal}
        setUserOpen={setUserOpen}
      />
      <HospitalRegestration
        hospitalRegestration={hospitalRegestration}
        onHospitalRegestrationModal={onHospitalRegestrationModal}
        setHospitalOpen={setHospitalOpen}
      />
    </>
  );
}

export default HomePage;

//hello
