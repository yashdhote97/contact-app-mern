import React, { Component } from "react";
import axios from "axios";
import "./styles/updates.css";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:"",
        email:"",
        phone:"",
        address:"",
        contactArr:[]
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
  onSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };
    let token=JSON.parse(localStorage.getItem("token"));
    axios
    .post("https://merncontactsapi.herokuapp.com/contacts/update/"+this.props.match.params.id, contact,{headers:{"authorization":token}})
    .then((res) => {
        alert("Contact Updated");
        window.location = "/contacts";
    })
    .catch(err => {
        if(!err.response){
          alert("Server is not Avaliable right now");
        }
        else if (err.response.status === 400) {
          console.log(err.response);
          alert(err.response.data);
        }
    });
    axios
    .get("https://merncontactsapi.herokuapp.com/contacts/")
    .then((res) => {
        this.setState({contactArr:res.data})
        // alert("Contact Added");
    })
    .catch(err => {
        if(!err.response){
          alert("Server is not Avaliable right now")
        }
        else if (err.response.status === 400) {
          console.log(err.response);
          alert(err.response.data);
        }
    });
  }
  componentDidMount(){

    axios.get('https://merncontactsapi.herokuapp.com/contacts/'+this.props.match.params.id)
    .then(response => {
      this.setState({
        name: response.data.name,
        email: response.data.email,
        address: response.data.address,
        phone: response.data.phone
      })   
    })
    .catch(function (error) {
      console.log(error);
    })
    axios
    .get("https://merncontactsapi.herokuapp.com/contacts/")
    .then((res) => {
        this.setState({contactArr:res.data})
    })
    .catch(err => {
        if(!err.response){
          alert("Server is not Avaliable right now")
        }
        else if (err.response.status === 400) {
          console.log(err.response);
          alert(err.response.data);
        }
    });
  }
  render() {
    return (
      <div id="updateWrap">
        <div id="updateContact">
          <h2>Update  Contact</h2>
          <form id="updateForm" onSubmit={this.onSubmit}>
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
            <button id="registerContact" type="submit">Update Contact</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Update;