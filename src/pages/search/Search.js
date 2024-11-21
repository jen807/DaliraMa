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
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 14px;
  margin: 5px 0;
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
          <Title>{result.hrName}</Title>
          <Info>마번: {result.hrNo}</Info>
          <Info>출생일: {result.birthday}</Info>
          <Info>성별: {result.sex}</Info>
          <Info>조교사명: {result.trName}</Info>
          <Info>부마: {result.faHrName}</Info>
          <Info>모마: {result.moHrName}</Info>
          <Info>최근 1년 출전 횟수: {result.rcCntY}</Info>
          <Info>통산 1착 횟수: {result.ord1CntT}</Info>
        </ResultContainer>
      )}
    </Container>
  );
};

export default SearchPage;
