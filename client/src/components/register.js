import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
  state = {
    isRegistered: false
  }

handleSubmit = event => {
  event.preventDefault();
  
  const email = this.refs.email.value;
  const password = this.refs.password.value;
  const name = this.refs.name.value;
  axios.post('http://localhost:8000/register', { email, password , name })
    .then(res => {
      if (res.data) {
      this.setState({
        isRegistered : true
      })  
      }
    })
    .catch(error => {
            return(error.response);
    })
  };
  
  render() {
    if (this.state.isRegistered) {
     
  alert("Registration Success");
  alert("Please log in to continue");
    return <Redirect to='/login'/>  
   }

    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"><i className="fas fa-user-plus"></i> Register </h1>
            <form  onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label >Email</label>
                <input
                  type="email"
                  id="email"
                  ref="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
                <label >Name</label>
                <input
                  type="name"
                  id="name"
                  ref="name"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group">
                <label >Password</label>
                <input
                  type="password"
                  id="password"
                  ref="password"
                  className="form-control"
                  placeholder="Create Password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <p className="lead mt-4">Have An Account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    )
  }
}
