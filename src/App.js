import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header1 from './components/Header1';
import AccountCard from './pages/MyAccount';
import Home from "./pages/home";
import ShowProfile from "./pages/profile";
import ShowMatch from "./pages/match";
import ShowQuestionaire from "./pages/questionaire";
import ShowStatusMatch from "./pages/matchStatus";
import ButtonAppBar from "./components/appbar";
import Divider from "@material-ui/core/Divider";
import theme from './theme/muiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';


 //app
function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Header1 />
          <FrontPage/>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Route>
        <Route exact path="/register">
          <Header1 />
          <Register/>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Route>
        <Route exact path="/home">
          <ButtonAppBar />
          <Divider />
          <Home />
        </Route>
        <Route exact path="/profile">
          <ButtonAppBar />
          <Divider />
          <ShowProfile />
        </Route>
        <Route exact path="/questionaire">
          <ButtonAppBar />
          <Divider />
          <ShowQuestionaire />
        </Route>

        <Route exact path="/matching">
          <ButtonAppBar />
          <Divider />
          <ShowMatch />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Route>
        <Route path="/myaccount">
          <AccountCard/>
          <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          {/* Same as */}
          <ToastContainer />
        </Route>
        <Route exact path="/matching-status">
          <ButtonAppBar />
          <Divider />
          <ShowStatusMatch />
        </Route>
        <Route path="/404">
          <div>
            <h1>
              404 Error - backend server is down, try to reconnect later
            </h1>
          </div>
        </Route>
      </Switch>
      <Footer />
    </Router> 
    </MuiThemeProvider>
  )
}

export default App;
