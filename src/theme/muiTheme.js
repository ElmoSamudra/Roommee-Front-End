import { createMuiTheme } from "@material-ui/core/styles";
import { orange, brown } from "@material-ui/core/colors";

const Theme = createMuiTheme({
  palette: {
    primary: brown,
    secondary: orange,
  },
  typography: {
    h1: {
      fontFamily: ["Raleway"],
      fontWeight: "normal",
    },
    h2: {
      fontFamily: ["Raleway"],
      fontWeight: "normal",
    },
    h3: {
      fontFamily: ["Raleway"],
      fontWeight: "normal",
    },
    h4: {
      fontFamily: ["Raleway"],
      fontWeight: "normal",
    },
    h5: {
      fontFamily: ["Raleway"],
      color: "#674b02",
    },
    subtitle1: {
      fontFamily: ["Raleway"],
      color: "#674b02",
      fontSize: "14px",
    },
    subtitle2: {
      fontFamily: ["Raleway"],
      color: "#674b02",
      fontSize: "14px",
    },
    body1: {
      fontFamily: ["Raleway"],
      fontSize: "20px",
      color: "#674b02",
    },
  },
});

export default Theme;
