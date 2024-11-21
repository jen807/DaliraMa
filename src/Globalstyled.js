import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "0 40px",
  moPadding: "20px",
};

export const GlobalStyled = createGlobalStyle`
${reset}

*{
    box-sizing: border-box;
}

body{
    font-family: "Noto Sans KR", sans-serif;
    letter-spacing: -1px;
    background: linear-gradient(to bottom, #191731, #53516B);
    color: white;
}

img{
    display: block;
    width: 100%;
}

a{
    text-decoration: none;
}

`;
