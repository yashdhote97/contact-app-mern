import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import profilepic from '../user1.png';
import "./styles/contacts.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  deleteContact = (id) => {
    axios
      .delete("https://merncontactsapi.herokuapp.com/contacts/" + id)
      .then((res) => {
        console.log(res.data);
        window.location="/contacts"
      });
  };
  render() {
    return (
      <div className="contact">
        <div className="img">
          <img src={profilepic} alt="profile pic" />
        </div>
        <div className="contactInfo">
          <h2 className="contactName">{this.props.contact.name}</h2>
          <h5><span className="contactDetail">Email</span> :  {this.props.contact.email}</h5>
          <h5><span className="contactDetail">phone</span> :  {this.props.contact.phone}</h5>
          <h5><span className="contactDetail">Addr</span>  :  {this.props.contact.address}</h5>
        </div>
        <div className="editButtons">
          <Link to={"/edit/" + this.props.contact._id} className="edit">EDIT</Link>
          <button className="delete"  onClick={() => {
          this.deleteContact(this.props.contact._id);
        }}>DELETE</button>
        </div>
      </div>
    );
  }
}

export default Contact;
