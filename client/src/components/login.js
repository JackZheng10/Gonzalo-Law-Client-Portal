import React, { Component } from 'react';
import axios from 'axios';

export default class login extends Component {
  
onSubmit = event => {
     event.preventDefault();
  const email = this.refs.email.value;
       const password = this.refs.password.value;
    console.log(email,password);
     
  
}



//   onSubmit = () => {
//     axios.post('http://localhost:8000/login')
//        .then(res => {
//         console.log(res.data);
//         })
//         .catch (error => {
//         console.log(error);
// });
    
  // }
  
  render() {
    return (
      <div className="row mt-5">
  <div className="col-md-6 m-auto">
    <div className="card card-body">
      <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label >Email</label>
          <input
            typeof="email"
                  id="email"
                  ref="email"
            // name="email"
            className="form-control"
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input
            typeof="password"
                  id="password"
                  ref="password"
            // name="password"
            className="form-control"
            placeholder="Enter Password"
          />
        </div>
        <button typeof="submit" className="btn btn-primary btn-block" >Login</button>
      </form>
      <p className="lead mt-4">
        No Account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
</div>

    )
  }
}
