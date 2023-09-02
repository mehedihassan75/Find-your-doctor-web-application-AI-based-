import React from "react";
import "../pages/App.scss";
import Typewriter from "typewriter-effect";
import { IoMailOutline, IoPowerOutline, IoStar } from "react-icons/io5";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useContext } from "react";
import { ModalControl } from "../ContextAPI";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Button, Checkbox, Form, Input, Image } from "antd";

let easeing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const fadeInUp = {
  initial: {
    y: -60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easeing,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: easeing,
    },
  },
};

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const TypingMotion = styled.h3`
  color: #0ca86d;
`;

const lastName = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

const UsrButton = styled(Button)`
  background-color: #fff;
  color: #07a267;
  width: 30%;
  &:hover {
    background-color: #0ca86d !important;
    color: red;
  }
`;

const LoginFormItem = styled(Form.Item)`
  display: flex;
  margin-left: 2px;
`;
const LogReg = styled(Button)`
  margin-right: 0.5rem;
  background-color: #0ca86d;
  font-weight: 600;
`;

const DoctorLoginImage = styled(Image)`
  display: flex;
  align-self: center !important;
`;

const star = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.8, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};

const header = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.05, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};
const LandingPage = ({ onUser, onDoctor, onHospital }) => {
  return (
    <motion.div initial="initial" animate="animate">
      <motion.header variants={stagger}>
        <motion.div className="logo_wrapper" variants={header}>
          medical<span>Assistant</span>
        </motion.div>
        <motion.div className="menu_container" variants={stagger}>
          <motion.span variants={header}></motion.span>
          <motion.span variants={header}>
            <IconContext.Provider value={{ color: "#000", size: "18px" }}>
              <div className="icon">
                <IoMailOutline />
              </div>
              hello@medicalassistant.com
            </IconContext.Provider>
          </motion.span>
        </motion.div>
      </motion.header>

      <motion.div
        className="content_wrapper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: easeing }}
      >
        <div className="left_content_wrapper">
          <motion.h2>
            <motion.span
              variants={firstName}
              initial="initial"
              animate="animate"
              className="first"
            >
              <motion.span variants={letter}>A</motion.span>
              <motion.span variants={letter}>n</motion.span>
              <motion.span variants={letter} className="second">
                A
              </motion.span>
              <motion.span variants={letter}>I</motion.span>
              <motion.span variants={letter} className="second">
                b
              </motion.span>
              <motion.span variants={letter}>a</motion.span>
              <motion.span variants={letter}>s</motion.span>
              <motion.span variants={letter}>e</motion.span>
              <motion.span variants={letter}>d</motion.span>
              <motion.span variants={letter} className="second">
                p
              </motion.span>
              <motion.span variants={letter}>l</motion.span>
              <motion.span variants={letter}>a</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>f</motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>m</motion.span>
            </motion.span>
            <motion.span
              variants={lastName}
              initial="initial"
              animate="animate"
              className="last"
            >
              <motion.span variants={letter}>T</motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter} className="second">
                f
              </motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>n</motion.span>
              <motion.span variants={letter}>d</motion.span>
              <motion.span variants={letter} className="second">
                y
              </motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>u</motion.span>
              <motion.span variants={letter}>r</motion.span>

              <motion.span variants={letter} className="second">
                D
              </motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>c</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>r</motion.span>
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeInUp}>
            <TypingMotion>
              <Typewriter
                options={{
                  strings: [
                    "Feeling uncomfortable?",
                    `Don't panic.`,
                    "Tell us your problems.",
                    "Our AI will tell you the specialist.",
                    "You will get the doctor list.",
                    "You can choose a doctor in your suitable area.",
                    "So what are you waiting for?",
                    "Checkout our features.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                }}
              />
            </TypingMotion>
          </motion.p>

          <motion.div className="btn_group" variants={stagger}>
            <UsrButton onClick={onUser} type="primary" size="large">
              User
            </UsrButton>
            <UsrButton onClick={onDoctor} type="primary" size="large">
              Doctor
            </UsrButton>
            <UsrButton onClick={onHospital} type="primary" size="large">
              Hospital
            </UsrButton>
          </motion.div>

          {/* <motion.div className="review_container" variants={stagger}>
            <motion.p className="total_review" variants={star}>
              64+ Reviews
            </motion.p>
            <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
            </IconContext.Provider>
            <motion.p className="more_review" variants={star}>
              More then 50+ people taking services.
            </motion.p>
          </motion.div> */}
        </div>

        <motion.div className="right_content_wrapper">
          <motion.img
            src={process.env.PUBLIC_URL + "/images/bg-image.gif"}
            alt="bg"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        </motion.div>
      </motion.div>

      {/* <Card /> */}
    </motion.div>
  );
};

export default LandingPage;
