import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { client } from "./apollo";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
