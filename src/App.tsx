import "./App.css";
import TranslationForm from "./Main/translationForm";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import {
  ThemeProvider,
  createTheme,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Helmet } from "react-helmet";
import ThemeSwitchIcon from "@material-ui/icons/Brightness6";
import { useState } from "react";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#8e24aa",
      light: "#c158dc",
      dark: "#5c007a",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#ce93d8",
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#000000"
    },
  },
});

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
      height: '100vh'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
  })
);

const App = () => {
  const [darkMode, setDarkMode] = useState(
    useMediaQuery("prefers-color-scheme: dark")
  );

  const classes = useStyles(DefaultTheme);
  var theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const handleThemeSwitch = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <header className="App-header">
          <ThemeProvider theme={DefaultTheme}>
            <AppBar
              position="static"
              style={{
                marginBottom: "30px",
              }}
            >
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Translate your text
                </Typography>
                <IconButton
                  color="inherit"
                  className={classes.menuButton}
                  onClick={handleThemeSwitch}
                >
                  <ThemeSwitchIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <TranslationForm />
            <div
              style={{
                position: "absolute",
                right: "5px",
                bottom: "5px",
              }}
            >
              <sub className="credit">
                by Poptum Charoennaew{" "}
                <a href="https://github.com/3c14ir">(github@3c14ir)</a> as part
                of learning React
              </sub>
            </div>
          </ThemeProvider>
        </header>
      </ThemeProvider>
    </div>
  );
};

export default App;
