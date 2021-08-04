import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import keyConfig from "./key.config";
import { useStyles, DefaultTheme } from "../App";

const { Translate } = require("@google-cloud/translate").v2;

interface Lang {
  code: string;
  name: string;
}

export type LangList = Lang[];

const CRED = JSON.parse(keyConfig.API_CRED);

const translate = new Translate({
  credentials: CRED,
  projectId: CRED.project_id,
});

const TranslationForm = () => {
  const classes = useStyles(DefaultTheme);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextQuery(event.target.value);
    if (errorStatus) setErrorStatus("");
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
    if (textQuery) translateText();
    else setErrorStatus("Please input your text.");
  };

  const [languages, setLanguages] = useState<LangList>([
    {
      code: "en",
      name: "English",
    },
    {
      code: "th",
      name: "Thai",
    },
  ]);

  useEffect(() => {
    async function listLanguages() {
      // Lists available translation language with their names in English (the default).
      const langs = await translate.getLanguages();
      setLanguages(langs[0]);
    }
    listLanguages();
  }, []);

  const [textQuery, setTextQuery] = useState("");
  const [textResult, setTextResult] = useState("...");
  const [toLang, setToLang] = useState("en");
  const [errorStatus, setErrorStatus] = useState("");

  return (
    <div className="translationMain flexhorizontal">
      <TextField
        className="textBox"
        value={textQuery}
        onChange={handleTextChange}
        placeholder="Please input your text."
        label="Text to translate"
        multiline
        rows={6}
        maxRows={10}
        fullWidth
        variant="outlined"
        error={errorStatus != ""}
        helperText={errorStatus}
      />
      <div className="proceed flexvertical">
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
            {languages.map(({ code, name }, index) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className="button" onClick={onClickSubmitButton}>
          Submit
        </Button>
      </div>
      <TextField
        className="textBox"
        value={textResult}
        onChange={handleTextChange}
        placeholder="Please input your text."
        label="Translated text"
        multiline
        rows={6}
        maxRows={10}
        variant="outlined"
        inputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default TranslationForm;
