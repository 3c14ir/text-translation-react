import React, {  useState, ChangeEvent, useEffect } from "react";
import { Button, Select, TextField, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { ThemeProvider, createTheme, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import keyConfig from "./key.config";

const {Translate} = require('@google-cloud/translate').v2;

interface Lang {
  code: string
  name: string
}

export type LangList = Lang[];

const CRED = JSON.parse(keyConfig.API_CRED);

const translate = new Translate({
  credentials: CRED,
  projectId: CRED.project_id
});

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#8e24aa",
      light: "#c158dc",
      dark: "#5c007a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ce93d8",
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#000000",
    },
  },
});

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const TranslationForm = () => {
  const classes = useStyles(DefaultTheme);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextQuery(event.target.value);
  };

  const handleToLangChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setToLang(event.target.value as string);
  };

  const onClickSubmitButton = () => {
    async function translateText() {
      // Translates the text into the target language. "text" can be a string for
      // translating a single piece of text, or an array of strings for translating
      // multiple texts.
      let [translations] = await translate.translate(textQuery, toLang);
      setTextResult(translations);
    }
    translateText();
  };

  const [languages, setLanguages] = useState<LangList>([
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'th',
      name: 'Thai'
    }
  ])

  useEffect(() => {
    async function listLanguages() {
      // Lists available translation language with their names in English (the default).
      const langs = await translate.getLanguages();
      setLanguages(langs[0])
    }
    listLanguages();
  }, []);

  const [textQuery, setTextQuery] = useState("");
  const [textResult, setTextResult] = useState("...");
  const [toLang, setToLang] = useState("en");

  return (
    <div>
      <ThemeProvider theme={DefaultTheme}>
        <div>
          <h1>Translate your text!</h1>
        </div>
        <div>
          <TextField
            className="textBox"
            value={textQuery}
            onChange={handleTextChange}
            placeholder="Please input your text."
            label="Text to translate"
            multiline
            rows={5}
            variant="outlined"
          />
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>To</InputLabel>
            <Select
              name=""
              id="toLang"
              className={classes.selectEmpty}
              value={toLang}
              onChange={handleToLangChange}
              displayEmpty
            >
              {languages.map(({ code, name }, index) => <MenuItem value={code}>{name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button className="button1" onClick={onClickSubmitButton}>
            Submit
          </Button>
        </div>
        <div>
          <TextField
            className="textBox"
            value={textResult}
            onChange={handleTextChange}
            placeholder="Please input your text."
            label="Translated text"
            multiline
            rows={5}
            variant="outlined"
            inputProps={{
              readOnly: true,
            }}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default TranslationForm;
