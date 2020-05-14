import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home";
import ShowProfile from "./pages/profile";
import ShowMatch from "./pages/match";
import ShowQuestionaire from "./pages/questionaire";
import ShowStatusMatch from "./pages/matchStatus";
import ButtonAppBar from "./components/appbar";
import Divider from "@material-ui/core/Divider";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <ButtonAppBar />
        <Divider />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/profile">
            <ShowProfile />
          </Route>

          <Route exact path="/questionaire">
            <ShowQuestionaire />
          </Route>

          <Route exact path="/matching">
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
            {/* Same as */}
            <ToastContainer />
          </Route>

          <Route exact path="/matching-status">
            <ShowStatusMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
