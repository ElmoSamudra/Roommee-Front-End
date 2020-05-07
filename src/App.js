import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/nav";
import Home from "./pages/home";
import Profile from "./pages/profile";
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
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


