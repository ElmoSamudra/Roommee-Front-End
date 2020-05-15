import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

export default function BinaryTabs({ set, init }) {
  //   const [value, setValue] = React.useState(2);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 500,
    },
  });

  console.log(init);
  return (
    <Paper square className={useStyles.root}>
      <Tabs
        value={init}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
        onChange={(e, value) => {
          set(value);
        }}
        aria-label="disabled tabs example"
      >
        <Tab label="Male" value="male" />
        <Tab label="Female" value="female" />
      </Tabs>
    </Paper>
  );
}
