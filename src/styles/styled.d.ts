import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    disabled: string;
    bgColor: string;
    textColor: string;
    textColorBeforeHover: string;
    inputBgColor: string;
    white: string;
    red: string;
    pink: string;
    headerHeight: number;
  }
}
