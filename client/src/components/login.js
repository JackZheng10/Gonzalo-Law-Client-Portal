import  React,{ Component } from 'react';
import axios from 'axios';
import {Route, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';

export default class login extends Component {

  state = {
    isLoggedin : false
  }
  
onSubmit = event => {
     event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        axios.post('http://localhost:8000/login',{email,password})
          .then(res => {
            if (res.data.user) {                
                this.setState({
                  isLoggedin: true
                });
              }
            if (res.data.error || res.error) {
                alert(res.data.error,res.error)
              }
          })
          .catch (error => {
          alert(error.response);
          });
}
  
  render() {
    if (this.state.isLoggedin) {
            console.log("logged in");
      return <Redirect to='/dashboard'
        // component={Dashboard}
      />      

      
    }
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
