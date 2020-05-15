import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const options = ["male", "female"];

export default function GenderBox({ init, set }) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Autocomplete
        value={init}
        onChange={(event, newValue) => {
          set(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 200 }}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    </div>
  );
}
