import styled from "styled-components";
import { mainStyle } from "../Globalstyled";
import LogoImg from "../img/LogoImg.png";

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Logo = styled.div`
  width: 128px;
  height: 27px;
  background-image: url(${LogoImg});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Search = styled.div`
  font-size: 20px;
`;

const Header = () => {
  return (
    <Container>
      <Logo />
      <Search>검색</Search>
    </Container>
  );
};

export default Header;
