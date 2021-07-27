import React, { Component } from "react";
import axios from "axios";
import Contact from "./Contact";
import "./styles/contacts.css";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      activePage:0,
      contactArr: [],
      filteredArr: [],
    };
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };
  onChangePhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onChangeFilter = (e) => {
    let search = new RegExp(e.target.value, "i");
    let searchedArr = [...this.state.contactArr];
    let filtered = searchedArr.filter((obj) => search.test(obj.name));
    this.setState({
      filteredArr: filtered,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    };
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .post("https://merncontactsapi.herokuapp.com/contacts/add", contact, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        alert("Contact Added");
        //window.location = "/contacts";
      })
      .catch((err) => {
        if (!err.response) {
          alert("Server is not Avaliable right now");
        } else if (err.response.status === 400) {
          console.log(err.response);
          alert(err.response.data);
        }
      });
    axios
      .get("https://merncontactsapi.herokuapp.com/contacts/", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        this.setState({ contactArr: res.data });
        // alert("Contact Added");
      })
      .catch((err) => {
        if (!err.response) {
          alert("Server is not Avaliable right now");
        } else if (err.response.status === 400) {
          console.log(err.response);
          alert(err.response.data);
        }
      });
  };
  handlePageChange=(pageNumber)=> {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  componentDidMount() {
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://merncontactsapi.herokuapp.com/contacts/", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        this.setState({ contactArr: res.data });
      })
      .catch((err) => {
        if (!err.response) {
          alert("Server is not Avaliable right now");
        } else if (err.response.status === 400) {
          console.log(err.response);
          alert(err.response.data);
        }
      });
  }
  render() {
    let { contactArr, filteredArr } = this.state;
    return (
      <div id="contactListWrap">
        <div id="createContact">
          <h2>Create New Contact</h2>
          <form id="createContactForm" onSubmit={this.onSubmit}>
            <label htmlFor="name" className="label">
              Name :
            </label>
            <input
              className="userInput"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onChangeName}
              required
            />
            <label htmlFor="email" className="label">
              Email :
            </label>
            <input
              className="userInput"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
            <label htmlFor="phone" className="label">
              Phone :
            </label>
            <input
              className="userInput"
              id="phone"
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={this.state.phone}
              onChange={this.onChangePhone}
              required
            />
            <label htmlFor="address" className="label">
              Address :
            </label>
            <input
              className="userInput"
              id="address"
              type="text"
              name="address"
              placeholder="Address"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
            <button id="registerContact" type="submit">
              Create Contact
            </button>
          </form>
        </div>
        <div id="showContact">
          <input
            className="userInput"
            id="filter"
            type="text"
            name="filter"
            placeholder="Filter Using Name"
            onChange={this.onChangeFilter}
          />
          <div id="contactsWrap">
            {filteredArr.length
              ? filteredArr?.map((contact) => (
                  <Contact contact={contact} key={contact._id} />
                ))
              : contactArr?.map((contact) => (
                  <Contact contact={contact} key={contact._id} />
                ))}
          </div>

        </div>
      </div>
    );
  }
}

export default ContactList;
