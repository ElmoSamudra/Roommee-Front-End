import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
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
      </Switch>
      <Footer />
    </Router> )
}

export default App;
