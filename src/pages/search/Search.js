import React, { useState } from "react";
import styled from "styled-components";
import { fetchAllHorseData } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Container = styled.section`
  width: 100%;
  max-width: 440px;
  height: 100vh;
  margin: 0 auto;
  padding: 100px 40px;
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
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  height: 700px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;

  p {
    font-size: 20px;
    margin-top: 15px;
  }
`;

const Info = styled.p`
  font-size: 14px;
  margin: 5px 0;
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

  return (
    <Container>
      <SearchBar>
        <Input
          type="text"
          placeholder="마명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <Info>
            <div>통산 출전 횟수 :</div>
            <span>
              {result.rcCntT.length > 10
                ? `${result.rcCntT.slice(0, 10)}..`
                : result.rcCntT}
            </span>
          </Info>
          <Info>
            <div>통산 1착 횟수 :</div>
            <span>
              {result.ord1CntT.length > 10
                ? `${result.ord1CntT.slice(0, 10)}..`
                : result.ord1CntT}
            </span>
          </Info>
        </ResultContainer>
      )}
    </Container>
  );
};

export default SearchPage;
