import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';


export default class Register extends Component {

handleSubmit = event => {
     event.preventDefault();
      const email = this.refs.email.value;
      const password = this.refs.password.value;
  axios.post('http://localhost:8000/register', { email, password })
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      // console.log(error);
            return( "User already exits");
    })
  };
  
  render() {
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

// const mapStateToProps = (state) => {
//   return {
//     email: state.email,
//     password: state.password
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     matchName: () => dispatch({ type: 'MATCH_NAME' })  
//   }    
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Register);