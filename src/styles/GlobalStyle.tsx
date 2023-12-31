import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Unbounded2 from "../assets/fonts/subset-Unbounded-ExtraBold.woff2";
import Unbounded from "../assets/fonts/subset-Unbounded-ExtraBold.woff";
import PretendardSemiBold2 from "../assets/fonts/Pretendard-SemiBold.subset.woff2";
import PretendardSemiBold from "../assets/fonts/Pretendard-SemiBold.subset.woff";
import PretendardRegular2 from "../assets/fonts/Pretendard-Regular.subset.woff2";
import PretendardRegular from "../assets/fonts/Pretendard-Regular.subset.woff";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
  font-family: "Unbounded";
  src: url(${Unbounded2}) format("woff2"), url(${Unbounded}) format("woff");
  font-style: normal;
}

@font-face {
  font-family: "Pretendard600";
  src: url(${PretendardSemiBold2}) format("woff2"), url(${PretendardSemiBold}) format("woff");
  font-style: normal;
}

@font-face {
  font-family: "Pretendard400";
  src: url(${PretendardRegular2}) format("woff2"), url(${PretendardRegular}) format("woff");
  font-style: normal;
}

*, *::before, *::after {
  box-sizing: border-box;
}

a{
  color: inherit;
  text-decoration: none;
}

button{
  padding: 0;
  background: transparent;
  border: none;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
}

div{
  white-space: pre-wrap;
}

input{
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.textColor};;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
}

label{
  font-size: inherit;
}

select, option{
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

textarea{
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

body{
  background: ${({ theme }) => theme.background};
  font-family: "Pretendard400";
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
}
`;

export default GlobalStyle;
