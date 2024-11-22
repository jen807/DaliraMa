import styled from "styled-components";
import { MoonLoader } from "react-spinners";

const Container = styled.div`
  width: 100%;
  height: 956px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Loading = () => {
  return (
    <Container>
      <MoonLoader color="#fff" />
    </Container>
  );
};

export default Loading;
