import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./styles/contacts.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  deleteContact = (id) => {
    axios
      .delete("http://localhost:5000/contacts/" + id)
      .then((res) => {
        console.log(res.data);
        window.location="/contacts"
      });
  };
  render() {
    return (
      <div className="contact">
        <div className="img">
          <img src="https://icon-library.net/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg" alt="" />
        </div>
        <div className="contactInfo">
          <h2 className="contactName">{this.props.contact.name}</h2>
          <h5>Email: {this.props.contact.email}</h5>
          <h5>phone: {this.props.contact.phone}</h5>
          <h5>Addr : {this.props.contact.address}</h5>
        </div>
        <div className="editButtons">
          <Link to={"/edit/" + this.props.contact._id} className="edit">edit</Link>
          <a className="delete"  onClick={() => {
          this.deleteContact(this.props.contact._id);
        }}>DELETE</a>
        </div>
      </div>
    );
  }
}

export default Contact;
