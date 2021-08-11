import "./App.css";
import TranslationForm from "./Main/translationForm";
import { AppBar, Toolbar, Typography, IconButton, Paper } from "@material-ui/core";
import {
  ThemeProvider,
  createTheme,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Helmet } from "react-helmet";
import ThemeSwitchIcon from "@material-ui/icons/Brightness6";
import { useState } from "react";
import { useEffect } from "react";

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
      height: '100vh',
      // backgroundColor: theme.palette.background.paper
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
  const [darkMode, setDarkMode] = useState(true);
  
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#8e24aa",
        light: "#c158dc",
        dark: "#5c007a",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ab47bc",
        light: "#ffc4ff",
        dark: "#9c64a6",
        contrastText: "#000000"
      },
    },
  });
  const classes = useStyles(theme);

  const handleThemeSwitch = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {    
    setDarkMode(localStorage.getItem('darkMode') === 'true');
  }, []);
  
  useEffect(() => {    
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className={classes.root}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100vh" }}>
          <CssBaseline/>
          <header className="App-header">
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
          </header>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default App;
