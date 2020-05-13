import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header1 from './components/Header1';
import Header2 from './components/Header2';


function App() {
  return (
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
          <Header2 />  
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
