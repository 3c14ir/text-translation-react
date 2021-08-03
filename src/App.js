import "./App.css";
import React from "react";
import TranslationForm from "./Main/translationForm";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Helmet } from "react-helmet";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div className="App">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <TranslationForm />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
