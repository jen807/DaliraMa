import styled from "styled-components";
import { mainStyle } from "../../Globalstyled";
import CloverPng from "../../img/clover.png";
import { useEffect, useState } from "react";
import { fetchAllHorseData } from "../../api"; // fetchAllHorseData 함수가 있어야 합니다.

const Container = styled.section`
  width: 100%;
  max-width: 440px;
  height: 100vh;
  padding: ${mainStyle.pcPadding};
  margin: 0 auto;
  padding-top: 110px;
`;

const LuckyHorseContainer = styled.div`
  width: 100%;
  height: 440px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 35px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  h1 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.3px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Clover = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${CloverPng});
  background-size: contain;
  background-repeat: no-repeat;
`;

const NumberWrap = styled.div`
  padding: 0 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 60px;
  width: 100%;
  height: 80px;
`;

const Gender = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Birth = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  font-weight: 500;
  color: #191731;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopCon = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 65px;
  background: linear-gradient(to right, #8b8a9a, #67657a);
  border-radius: 10px;

  p {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const CenterCon = styled(TopCon)``;

const BottomCon = styled(TopCon)``;

const Home = () => {
  const [horseList, setHorseList] = useState([]);
  const [randomHorse, setRandomHorse] = useState(null);

  useEffect(() => {
    const loadHorses = async () => {
      try {
        const horses = await fetchAllHorseData();
        // console.log("불러온 말 리스트:", horses);

        setHorseList(horses);

        if (horses.length > 0) {
          const randomIndex = Math.floor(Math.random() * horses.length);
          setRandomHorse(horses[randomIndex]);
        }
      } catch (error) {
        console.error("Error loading horse data:", error);
      }
    };

    loadHorses();
  }, []);

  return (
    <Container>
      <LuckyHorseContainer>
        <Title>
          <Clover />
          <h1>
            {randomHorse
              ? `${randomHorse.hrName} · ${randomHorse.hrNo}`
              : "Loading..."}
          </h1>
          <Clover />
        </Title>

        <NumberWrap>
          <LeftCon>
            <h3>통산 출전 횟수</h3>
            <h1>{randomHorse ? randomHorse.rcCntT : "-"}</h1>
          </LeftCon>

          <CenterBar />

          <RightCon>
            <h3>통산 우승 횟수</h3>
            <h1>{randomHorse ? randomHorse.ord1CntT : "-"}</h1>
          </RightCon>
        </NumberWrap>

        <InfoWrap>
          <Gender>
            <h2>성별</h2>
            <h2>{randomHorse ? randomHorse.sex : "-"}</h2>
          </Gender>
          <Birth>
            <h2>출생일</h2>
            <h2>{randomHorse ? randomHorse.birthday : "-"}</h2>
          </Birth>
          <TrName>
            <h2>조교사명</h2>
            <h2>{randomHorse ? randomHorse.trName : "-"}</h2>
          </TrName>
        </InfoWrap>
        <Button>오늘 당신의 행운마는?</Button>
      </LuckyHorseContainer>

      <InfoContainer>
        <TopCon>
          <p>통산 1착 횟수 1위</p>
          <h2>마명 · 마번 · 출생일</h2>
        </TopCon>
        <CenterCon>
          <p>최근 1년 출전 횟수 1위</p>
          <h2>마명 · 마번 · 출생일</h2>
        </CenterCon>
        <BottomCon>
          <p>현역 최고령 경주마</p>
          <h2>마명 · 마번 · 출생일</h2>
        </BottomCon>
      </InfoContainer>
    </Container>
  );
};

export default Home;
