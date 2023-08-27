import { DefaultTheme } from "styled-components";

export const PRIMARY_COLOR = "#845EF7";

const bgGradientStartColor = "#242233";
const bgGradientEndColor = "#3B3665";

export const theme: DefaultTheme = {
  textColor: "#FFFFFF",
  textInvertedColor: "#9CA3AF",
  primary: "#845EF7",
  surface: "#262438",
  disabled: "#717171",
  white: "#FFFFFF",
  background: `linear-gradient(to right, ${bgGradientStartColor}, ${bgGradientEndColor})`,
  headerHeight: "74px",
  maxWidthDesktop: "1100px",
  maxWidthTablet: "768px",
  maxWidthMobile: "640px",
};
