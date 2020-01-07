import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

export  class Register extends Component {

 handleSubmit = event => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8000/register',
            headers: {
                'crossDomain': true,  //For cors errors 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              userName: this.props.userName
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(error => {
     console.log(error);
});
    }   
  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Register
            </h1>
            <form action="/register" method="POST" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="form-control"
                  typeof="text"
                  placeholder="Enter Name"
                  // value=""
                />
              </div>
              <div className="form-group">
                <label >Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  // value=""
                />
              </div>
              <div className="form-group">
                <label >Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Create Password"
                  // value=""
                />
              </div>
              <div className="form-group">
                <label >Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  className="form-control"
                  placeholder="Confirm Password"
                  // value=""
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

const mapStateToProps = (state) => {
  return {
    age: state.age,
    userName: state.userName
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    matchName: () => dispatch({ type: 'MATCH_NAME' })  
  }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);