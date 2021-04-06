import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";

import "./App.css";


function App() {
  return (
    <Router>
      <Header />

      <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route  component={ErrorPage} />
      </Switch>
     
      <Footer />
    </Router>
  );
}

export default App;