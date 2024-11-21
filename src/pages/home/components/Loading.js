import styled from "styled-components";
import { MoonLoader } from "react-spinners";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <MoonLoader color="#42405B" />
    </Container>
  );
};

export default Loading;
