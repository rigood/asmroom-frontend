import { DefaultTheme } from "styled-components";
import { HEADER_HEIGHT } from "../constants";

export const common = {
  headerHeight: HEADER_HEIGHT,
};

export const dark: DefaultTheme = {
  ...common,
  primary: "#755CFD",
  bgColor: "linear-gradient(to right, #242233, #3B3665)",
  textColor: "#FFFFFF",
};

export const light: DefaultTheme = {
  ...common,
  primary: "#755CFD",
  bgColor: "#FFFFFF",
  textColor: "#111111",
};
