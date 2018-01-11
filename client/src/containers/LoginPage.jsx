import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      redirect: false,
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    //AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      //AJAX successful
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        });
        // save the token
        Auth.authenticateUser(xhr.response.token);
        localStorage.setItem('usrname', JSON.stringify(xhr.response.user));        
        console.log(JSON.parse(localStorage.getItem('usrname')).name);
        this.setState({redirect: true});
      } else {
      //AJAX fail  
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

//render login form if redirect is false, else redirect to home
  render() {
    return (
      <div>
      {this.state.redirect === false ? (   
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}        
        user={this.state.user}
      />):(
        <Redirect to='/' />
      )}
      </div>
    );
  }
}

export default LoginPage;