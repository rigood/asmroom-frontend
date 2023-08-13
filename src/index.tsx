import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={dark}>
      <GlobalStyle />
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </ApolloProvider>
);
