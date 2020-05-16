
import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    fontFamily: 'Raleway, Roboto, Bitter, sans-serif',
    useNextVariants: true,
      h2: {
        fontFamily: 'Raleway, Arial, sans-serif',
        fontWeight: 300,
        fontSize: 14,
        color: '#FF0000'
      },
      body1: {
        fontFamily: 'Raleway, Arial, sans-serif',
        fontWeight: 300,
        fontSize: 14,
        color: '#FF0000'
      },
  });

export default Theme;