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
  font-family: inherit;
  color: inherit;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

body{
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-family: "Pretendard400";
}
`;

export default GlobalStyle;
