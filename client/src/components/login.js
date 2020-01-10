import  React,{ Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class login extends Component {

  state = {
    isLoggedin: false,
    user: '',
    persons: [],
    email: '',
    name:''
  }
  
onSubmit = event => {
  event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        axios.post('http://localhost:8000/login',{email,password})
          .then(res => {
            if (res.data.user) {                
              this.setState({
                isLoggedin: true,
                user: email
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
  
  componentWillMount() {
    axios.get('http://localhost:8000/')
      .then(res => {
        if (this.state.isLoggedin) {
          console.log(res.data);
          let persons = res.data;
          console.log(persons);
          this.setState({ persons });
        } 
        })
  }

  render() {
    if (this.state.isLoggedin) {
      console.log(this.state.user);
      alert("logged in");
      localStorage.setItem('user',this.state.user)
      return <Redirect to='/dashboard'/>      
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
                  required
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
                  required
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
