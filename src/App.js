import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header1 from './components/Header1';
import AccountCard from './pages/MyAccount';



function App() {
  return (
    <Router>
      <Header1 />
      <Switch>
        <Route exact path="/">
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
    </Router> )
}

export default App;
