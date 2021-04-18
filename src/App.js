import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactList from "./components/ContactList";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Update from "./components/Update";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="user/register" />
          </Route>
          <Route path="/user/register" component={Register}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/contacts" component={ContactList}></Route>
          <Route path="/edit/:id" component={Update}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
