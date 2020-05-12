import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from '@material-ui/core/Typography';
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
    paddingTop: "50px",
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
      <Slider
        defaultValue={initValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        onChange={(e, val) => {
          set(val);
        }}
      />
    </div>
  );
}
