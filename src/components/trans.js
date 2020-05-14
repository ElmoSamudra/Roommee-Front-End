import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: "flex",
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function SimpleFade({ func }) {
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
          <h5>Invitation Sent!</h5>
        </Fade>
      </div>
    </div>
  );
}
