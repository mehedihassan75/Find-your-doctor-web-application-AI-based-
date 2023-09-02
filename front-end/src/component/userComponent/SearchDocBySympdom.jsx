import { Button, Modal, Select } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import symptomsBangla from "./symptomsListBangla.js";
import symptoms from "./symptomsList.js";
import {
  getHospitalWithDocListBySymptoms,
  getSymptom,
} from "../../api/userApi/userApi.js";
import SearchDocBySympdomCard from "./card/SearchDocBySympdomCard.jsx";

const SearchDoctorWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;
const Intro = styled.div`
  display: flex;
  flex-direction: column;
`;
const IntroText = styled.p`
  color: #135f35;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  font-size: 1.25rem;
  background-color: #bee9dc;
  padding-bottom: 2rem;
  border-radius: 10px;
  margin: 20px;
`;
const SearchSection = styled.div`
  margin: 20px;
`;
const LanguageButton = styled(Button)`
  font-weight: 600;
  background-color: #34c434;
`;
const SearchDocBySympdom = () => {
  const [language, setLanguage] = useState("en");
  const [symArr, setSympArr] = useState(symptoms);
  const [specialist, setSpecialist] = useState("");
  const [getResult, setResult] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = symArr.filter(
    (o) => !selectedItems.includes(o.display)
  );

  const getSearchValue = async () => {
    if (selectedItems.length < 3) {
      alert("Please choose at least 3 symptoms");
    } else {
      console.log(selectedItems);
      showModal();
      const { data } = await getSymptom(selectedItems);
      const Result = await getHospitalWithDocListBySymptoms(data);
      setSpecialist(data);
      setResult(Result.data);
      //   alert(data);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
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
      <Modal
        title="Hello User"
        open={isModalOpen}
        onOk={handleOk}
        // onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>
          We are very sad that you are not well. You need <b>{specialist}</b>{" "}
          consultant. We are suggesting you some specialized doctor for you.
          please click <b>ok</b> button to see the result.
        </p>
      </Modal>
      <SearchDoctorWrapper>
        <Intro>
          <IntroText>
            Dear User, Please Provide us at least <b>three</b> symptoms so that
            our system can find the correct specialist for you.
          </IntroText>
          <SearchSection>
            <LanguageButton
              type="primary"
              onClick={() => {
                setLanguage((prev) => {
                  if (prev === "en") {
                    setSympArr(symptomsBangla);
                    return "bn";
                  } else {
                    setSympArr(symptoms);

                    return "en";
                  }
                });
                //   setSympArr((prev)=>{
                //     if(lan)
                //   })
              }}
            >
              {language === "bn"
                ? "Search in English"
                : "বাংলায় অনুসন্ধান করুন"}
            </LanguageButton>
            <div style={{ marginTop: "20px" }}>
              <Select
                mode="multiple"
                placeholder="Select three"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                  width: "100%",
                }}
                options={filteredOptions.map((item) => ({
                  value: item.name,
                  label: item.display,
                }))}
              />
              <Button
                onClick={getSearchValue}
                style={{ marginTop: "10px" }}
                type="primary"
              >
                Search
              </Button>
            </div>
          </SearchSection>
        </Intro>
        {getResult.length > 0 ? (
          <div
            style={{
              display: "flex",
              marginLeft: 20,
              flexWrap: "wrap",
            }}
          >
            {getResult.map((userData, i) => (
              <SearchDocBySympdomCard
                key={i}
                userData={userData}
                suggestedSpecialist={specialist}
              />
            ))}
          </div>
        ) : (
          <p style={{ marginLeft: "20px" }}>{specialist} Not Found</p>
        )}
      </SearchDoctorWrapper>
    </>
  );
};

export default SearchDocBySympdom;
