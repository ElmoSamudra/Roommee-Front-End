import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from '@material-ui/core/Typography';
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider({ set, initValue }) {
  const classes = useStyles();
  //const initVal = value;
  console.log("inside slider" + initValue);
  return (
    <div className={classes.root}>
      {/* <Typography id="discrete-slider" gutterBottom>
        Rate
      </Typography> */}
      <Slider
        defaultValue={initValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        onChange={(event) => {
          set(event.target.value);
        }}
      />
    </div>
  );
}
