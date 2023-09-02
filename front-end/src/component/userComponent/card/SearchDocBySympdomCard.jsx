import { Button, Card, Modal, Table } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { getDoctorDetails } from "../../../api/userApi/userApi";

const CardWrapper = styled.div`
  /* background-color: red; */
  padding: 5px;
`;
const CardStyle = styled(Card)`
  width: 490px !important;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
`;
const CardRow = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  width: 50%;
  padding: 4px 0px;
  border-bottom: 1px solid #e0dede;
`;
const CardWrap = styled.div`
  display: flex;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
`;

const ButtonStyle = styled(Button)`
  border: 2px solid #4096ff;
  font-weight: 600;

  &&hover {
    background-color: white !important;
  }
`;

const HospitalNameAndPhone = ({
  hospitalName,
  hospitalPhoneNumber,
  hospitalEmail,
  div,
  dis,
}) => {
  return (
    <div>
      <h4>Hospital: {hospitalName}</h4>
      <p>Phone: {hospitalPhoneNumber}</p>
      <p>Email: {hospitalEmail}</p>
      <p>
        Location: {div}, {dis}
      </p>
    </div>
  );
};

const DetailsModal = styled(Modal)`
  width: 560px !important;
  height: 750px !important;
`;
const SearchDocBySympdomCard = ({ userData, suggestedSpecialist }) => {
  const [getDoctor, setDoctor] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (id) => {
    const { data } = await getDoctorDetails(id);
    setDoctor(data);
    console.log(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {getDoctor ? (
        <DetailsModal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <CardStyle
            title={getDoctor.name}
            bordered={false}
            style={{ width: 300 }}
          >
            <CardWrap>
              <CardRow>Email:</CardRow>
              <CardRow>{getDoctor.email}</CardRow>
            </CardWrap>
            <CardWrap>
              <CardRow>Gender:</CardRow>
              <CardRow>{getDoctor.gender}</CardRow>
            </CardWrap>
            <CardWrap>
              <CardRow>Specialist:</CardRow>
              <CardRow>{getDoctor.specialist}</CardRow>
            </CardWrap>
            <CardWrap>
              <CardRow>MBBS:</CardRow>
              <CardRow>{getDoctor.mbbsInstitue}</CardRow>
            </CardWrap>
            <CardWrap>
              <CardRow>Current Profession:</CardRow>
              <CardRow>{getDoctor.currentProfession}</CardRow>
            </CardWrap>
          </CardStyle>
        </DetailsModal>
      ) : null}
      <CardWrapper>
        <CardStyle
          title={
            <HospitalNameAndPhone
              hospitalName={userData.name}
              hospitalPhoneNumber={userData.phone}
              hospitalEmail={userData.email}
              div={userData.locationDiv}
              dis={userData.locationDis}
            />
          }
          bordered={false}
          style={{ width: 300 }}
        >
          {userData.doctorList.map(
            (data) =>
              data && (
                <CardWrap>
                  <CardRow>Dr. {data.name}</CardRow>
                  <CardRow>{data.specialist}</CardRow>
                  <Button
                    onClick={() => {
                      showModal(data._id);
                    }}
                  >
                    Details
                  </Button>
                </CardWrap>
              )
          )}
          <ButtonWrap>
            <ButtonStyle
              type="primary"
              onClick={() => {
                navigator.clipboard.writeText(userData.phone);
              }}
            >
              Copy Phone Number
            </ButtonStyle>
            <ButtonStyle
              type="primary"
              onClick={() => {
                navigator.clipboard.writeText(userData.email);
              }}
            >
              Copy Email
            </ButtonStyle>
          </ButtonWrap>
        </CardStyle>
      </CardWrapper>
    </>
  );
};

export default SearchDocBySympdomCard;
