import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function FormControlLabelPlacement({ set, initValue }) {
  const initVal = initValue;
  console.log(initVal);
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue={initVal}
        onChange={(e, value) => {
          set(value);
        }}
      >
        <FormControlLabel
          value="yes"
          control={<Radio color= "secondary" />}
          label="Yes"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="no"
          control={<Radio color="primary" />}
          label="No"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
}
