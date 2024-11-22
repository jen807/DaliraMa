import React, { useState } from "react";
import styled from "styled-components";
import { fetchAllHorseData } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Ma from "../../img/ma.png";
import { PieChart } from "react-minimal-pie-chart";
import useScrollTop from "../../lib/useScrollTop";

const Container = styled.section`
  width: 100%;
  max-width: 440px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 100px 40px;
`;

const MaImg = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(${Ma});
  width: 372.5px;
  height: 267.58px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid white;
  padding-right: 10px;
`;

const Input = styled.input`
  all: unset;
  width: 80%;
  height: 40px;
  padding: 0 10px;
`;

const Button = styled.button`
  width: 18%;
  height: 40px;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  all: unset;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const ResultContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  width: 100%;
  height: 700px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 40px;
  font-size: 38px;
  font-weight: bold;
  /* margin-bottom: 10px; */
  text-align: center;

  p {
    font-size: 20px;
    margin-top: 15px;
  }
`;

const Info = styled.p`
  font-size: 14px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 60px;
  align-items: center;

  div {
    font-weight: 700;
    width: 82px;
    margin-right: 20px;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    max-width: 200px;
  }
`;

const LeftCon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: 1px;
  }
`;

const CenterBar = styled.div`
  width: 2px;
  height: 80px;
  background-color: white;
  opacity: 0.2;
`;

const RightCon = styled(LeftCon)``;

const NumberWrap = styled.div`
  padding: 0 40px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 50%;
  transform: translateX(+50%);
  width: 40px;
  height: 40px;
  background-color: #191731;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const allHorses = await fetchAllHorseData();
      const horse = allHorses.find((item) => item.hrName === searchTerm.trim());

      if (horse) {
        setResult(horse);
      } else {
        setResult(null);
        setError("검색한 마명을 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("Search Error:", err);
      setError("검색 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <MaImg />
      <SearchBar>
        <Input
          type="text"
          placeholder="마명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </SearchBar>
      {loading && <p>검색 중...</p>}
      {error && <p style={{ color: "#FF5656" }}>{error}</p>}
      {result && (
        <ResultContainer>
          <Title>
            {result.hrName}
            <p>{result.hrNo}번</p>
          </Title>
          <PieChart
            data={[
              {
                title: "1착",
                value: result.ord1CntT,
                color: "#fff",
              },
              {
                title: "나머지",
                value: result.rcCntT - result.ord1CntT,
                color: "#7A798A",
              },
            ]}
            radius={30}
            lineWidth={20}
            startAngle={-90}
            style={{ height: "250px" }}
          />

          <NumberWrap>
            <LeftCon>
              <h3>통산 출전 횟수</h3>
              <h1>
                {result.rcCntT.length > 10
                  ? `${result.rcCntT.slice(0, 10)}..`
                  : result.rcCntT}
              </h1>
            </LeftCon>

            <CenterBar />

            <RightCon>
              <h3>통산 우승 횟수</h3>
              <h1>
                {result.ord1CntT.length > 10
                  ? `${result.ord1CntT.slice(0, 10)}..`
                  : result.ord1CntT}
              </h1>
            </RightCon>
          </NumberWrap>

          <Info>
            <div>출생일 :</div>
            <span>
              {result.birthday.length > 10
                ? `${result.birthday.slice(0, 10)}..`
                : result.birthday}
            </span>
          </Info>
          <Info>
            <div>성별 :</div>
            <span>
              {result.sex.length > 10
                ? `${result.sex.slice(0, 10)}..`
                : result.sex}
            </span>
          </Info>
          <Info>
            <div>조교사명 :</div>
            <span>
              {result.trName.length > 10
                ? `${result.trName.slice(0, 10)}..`
                : result.trName}
            </span>
          </Info>
          <Info>
            <div>부마 :</div>
            <span>
              {result.faHrName.length > 10
                ? `${result.faHrName.slice(0, 10)}..`
                : result.faHrName}
            </span>
          </Info>
          <Info>
            <div>모마 :</div>
            <span>
              {result.moHrName.length > 10
                ? `${result.moHrName.slice(0, 10)}..`
                : result.moHrName}
            </span>
          </Info>
        </ResultContainer>
      )}
      <ScrollTopButton onClick={ScrollToTop}>TOP</ScrollTopButton>
    </Container>
  );
};

export default SearchPage;
