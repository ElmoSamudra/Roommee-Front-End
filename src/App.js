import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MDCIconButtonToggle } from "@material/icon-button";

import Nav from "./components/nav";
import Home from "./pages/home";
import ShowProfile from "./pages/profile";
import ShowMatch from "./pages/match";
import ShowQuestionaire from "./pages/questionaire";
import ShowStatusMatch from "./pages/matchStatus";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* the content */}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Nav />
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
