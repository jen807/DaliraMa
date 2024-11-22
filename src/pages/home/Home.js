import styled from "styled-components";
import { mainStyle } from "../../Globalstyled";
import CloverPng from "../../img/clover.png";
import { useEffect, useState } from "react";
import { fetchAllHorseData } from "../../api";
import Ma from "../../img/ma.png";
import Loading from "./components/Loading";
import useScrollTop from "../../lib/useScrollTop";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  width: 100%;
  max-width: 440px;
  padding: ${mainStyle.pcPadding};
  margin: 0 auto;
  padding-top: 110px;
  min-height: 956px;
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

const LuckyHorseContainer = styled.div`
  width: 100%;
  height: 440px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
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
  cursor: pointer;
`;
const Buttons = styled.button`
  all: unset;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #191731;
  border-radius: 5px;
  font-weight: 300;
  color: #fff;
  cursor: pointer;
`;

const TitleWrap = styled.div`
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 100px;
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
  backdrop-filter: blur(5px);
  font-size: 15px;
  font-weight: 600;

  p {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 400;
  }
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

const CenterCon = styled(TopCon)``;

const BottomCon = styled(TopCon)``;

const Home = () => {
  const [horseList, setHorseList] = useState([]);
  const [randomHorse, setRandomHorse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [topWinner, setTopWinner] = useState(null);
  const [topRacer, setTopRacer] = useState(null);
  const [oldestHorse, setOldestHorse] = useState(null);
  const navigate = useNavigate();

  const navigateToSearch = () => {
    if (randomHorse) {
      navigate("/search", { state: { hrName: randomHorse.hrName } });
    }
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const getRandomHorse = () => {
    if (horseList.length > 0) {
      const randomIndex = Math.floor(Math.random() * horseList.length);
      setRandomHorse(horseList[randomIndex]);
    }
  };

  useEffect(() => {
    const loadHorses = async () => {
      setLoading(true);
      try {
        const horses = await fetchAllHorseData();
        console.log("Fetched horses:", horses);
        setHorseList(horses);

        if (horses.length > 0) {
          const randomIndex = Math.floor(Math.random() * horses.length);
          setRandomHorse(horses[randomIndex]);

          const topWinnerHorse = horses.reduce((prev, current) =>
            prev.ord1CntT > current.ord1CntT ? prev : current
          );
          setTopWinner(topWinnerHorse);

          const topRacerHorse = horses.reduce((prev, current) =>
            prev.rcCntT > current.rcCntT ? prev : current
          );
          setTopRacer(topRacerHorse);

          const oldestHorseData = horses.reduce((prev, current) =>
            prev.birthday < current.birthday ? prev : current
          );
          setOldestHorse(oldestHorseData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading horse data:", error);
        setLoading(false);
      }
    };

    loadHorses();
  }, []);
  return (
    <Container>
      <MaImg />
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleWrap>당신만의 행운 경주마는?</TitleWrap>
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
            <Button onClick={getRandomHorse}>다른 행운마를 찾아볼까요?</Button>
            <Buttons onClick={navigateToSearch}>
              "{randomHorse ? randomHorse.hrName : "-"}" 에 대해 알아보기
            </Buttons>
          </LuckyHorseContainer>

          <TitleWrap>각 분야별 1위 경주마</TitleWrap>

          <InfoContainer>
            <TopCon>
              <p>통산 1착 횟수 1위</p>
              <h2>
                {topWinner
                  ? `${topWinner.hrName} · ${topWinner.hrNo} · ${topWinner.birthday}`
                  : "데이터 없음"}
              </h2>
            </TopCon>
            <CenterCon>
              <p>최근 통산 출전 횟수 1위</p>
              <h2>
                {topRacer
                  ? `${topRacer.hrName} · ${topRacer.hrNo} · ${topRacer.birthday}`
                  : "데이터 없음"}
              </h2>
            </CenterCon>
            <BottomCon>
              <p>현역 최고령 경주마</p>
              <h2>
                {oldestHorse
                  ? `${oldestHorse.hrName} · ${oldestHorse.hrNo} · ${oldestHorse.birthday}`
                  : "데이터 없음"}
              </h2>
            </BottomCon>
          </InfoContainer>
        </>
      )}

      <ScrollTopButton onClick={ScrollToTop}>TOP</ScrollTopButton>
    </Container>
  );
};

export default Home;
