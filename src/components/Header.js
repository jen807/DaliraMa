import styled from "styled-components";
// import { mainStyle } from "../Globalstyled";
import LogoImg from "../img/LogoImg.png";
import { Link } from "react-router-dom";

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 350px;
  padding-right: 10px;
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 440px) {
    padding-right: 40px;
    padding-left: 30px;
  }
`;

const Logo = styled.div`
  width: 128px;
  height: 27px;
  background-image: url(${LogoImg});
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(0.8);
`;

const Search = styled.div`
  font-size: 20px;
  color: white;
  a {
    color: white;
  }
`;

const Header = () => {
  return (
    <Container>
      <Link to={"/"}>
        <Logo />
      </Link>
      <Search>
        <Link to={"/search"}>검색</Link>
      </Search>
    </Container>
  );
};

export default Header;
