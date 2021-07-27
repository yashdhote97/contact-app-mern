import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../reducers";
import "./styles/navbar.css";

const Navbar = () => {
  let login=useSelector(state => state.loginStatus);
  console.log(login)
  const dispatch = useDispatch();
  return (
    <div id="nav">
      <div id="logo">
        <h1>CONTACTS-APP</h1>
      </div>
      <div id="options">
        {login?(
          <Link to="/user/login">
          <div id="register" onClick={() => dispatch(setLogin(false))}>
            <h4>Logout</h4>
          </div>
        </Link>
        ):(
          <>
          <Link to="/user/register">
          <div id="register">
            <h4>Register</h4>
          </div>
        </Link>
        <Link to="/user/login">
          <div id="login">
            <h4>Login</h4>
          </div>
        </Link>
        </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
