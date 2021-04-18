import React, { Component } from "react";
import { Link } from "react-router-dom";
import {setLogin} from "../reducers";
import { connect } from "react-redux";
import axios from "axios";
import "./styles/login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:"",
        password:""
    };
  }
  onChangeEmail = (e) => {
    this.setState({
        email: e.target.value,
    });
  }
  onChangePassword = (e) => {
    this.setState({
        password: e.target.value,
    });
  }
  onSubmit = (e) => {
      e.preventDefault();
      const userLogin = {
        email: this.state.email,
        password: this.state.password
      }
       axios
      .post("http://localhost:5000/user/login", userLogin)
      .then((res) => {
          alert("User Login Successful");
          localStorage.setItem("token", JSON.stringify(res.data));
          this.props.setLogin(true);
          sessionStorage.setItem("login", "true");
          window.location="/contacts/";
      })
      .catch(err => {
          if(!err.response){
            alert ("There is problem in connecting to Server");
          }
          else if (err.response.status === 400) {
            console.log(err.response);
            alert(err.response.data);
          }
          else{
            console.log(err)
          }
      });
  }
  render() {
    return (
      <form id="loginForm" onSubmit={this.onSubmit}>
        <h2>Login</h2>
        <label htmlFor="email" className="label">
          Email :
        </label>
        <input
          className="user-input"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.onChangeEmail}
        />
        <label htmlFor="password" className="label">
          Password :
        </label>
        <input
          className="user-input"
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.onChangePassword}
        />
        <button id="log-in" type="submit">Log-In</button>
        <span>
          Don't have an account? Please{" "}
          <Link to="/user/register" id="sign-in">
            Create Account here
          </Link>
        </span>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLogin: (data) => dispatch(setLogin(data))
})

const mapStateToProps = (store) => ({
  loginStatus: store?.loginStatus,
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
