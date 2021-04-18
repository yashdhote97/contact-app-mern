import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
    };
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
         axios
        .post("http://localhost:5000/user/register", user)
        .then((res) => {
            alert("User added to database...Please Login with this credentials on Login Page");
            window.location = "/user/login";
        })
        .catch(err => {
            if (err.response.status === 400) {
              console.log(err.response);
              alert(err.response.data);
            }
        });
  };
  render() {
    return (
      <form id="registerForm" onSubmit={this.onSubmit}>
        <h2>Create Account</h2>
        <label htmlFor="name" className="label">
          Name :
        </label>
        <input
          className="user-input"
          id="name"
          type="text"
          name="name"
          placeholder="User Name"
          value={this.state.name}
          onChange={this.onChangeName}
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
        <button id="sign-up" type="submit">
          SIGN UP
        </button>
        <span>
          Already have an account? Please{" "}
          <Link to="/user/login" id="sign-in">
            Sign In
          </Link>
        </span>
      </form>
    );
  }
}

export default Register;
