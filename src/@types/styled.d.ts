import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    textInvertedColor: string;
    primary: string;
    surface: string;
    disabled: string;
    white: string;
    background: string;
    headerHeight: string;
    maxWidthDesktop: string;
    maxWidthTablet: string;
    maxWidthMobile: string;
  }
}
