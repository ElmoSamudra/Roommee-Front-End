import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
  },
  container: {
    display: "flex",
  },
  ringRoom: {
    fontSize: 10,
  },
}));

export default function SimpleFade({ func, check }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = async () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={async () => {
              await handleChange();
              await func(checked);
            }}
          />
        }
        label="Ring Roommee?"
      />
      <div className={classes.container}>
        <Fade in={checked}>
          <h5 className={classes.ringRoom}>You have rang this room!</h5>
        </Fade>
      </div>
    </div>
  );
}
