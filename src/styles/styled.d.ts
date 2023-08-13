import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    bgColor: string;
    textColor: string;
    headerHeight: number;
  }
}
