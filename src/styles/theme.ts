import { DefaultTheme } from "styled-components";
import { HEADER_HEIGHT } from "../constants";

export const common = {
  headerHeight: HEADER_HEIGHT,
  white: "#FFFFFF",
  red: "#FD3043",
  pink: "#FF27A3",
  primary: "#845EF7",
  disabled: "#717171",
};

export const dark: DefaultTheme = {
  ...common,
  bgColor: "linear-gradient(to right, #242233, #3B3665)",
  textColor: "#FFFFFF",
  inputBgColor: "#262438",
};

export const light: DefaultTheme = {
  ...common,
  primary: "#755CFD",
  bgColor: "#FFFFFF",
  textColor: "#111111",
  inputBgColor: "#262438",
};
