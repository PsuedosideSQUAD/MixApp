import React from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import {Redirect} from 'react-router-dom';

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  processForm(event) {
    event.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    //AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      //AJAX successful
      if (xhr.status === 200) {

        this.setState({
          errors: {}
        });
        
        localStorage.setItem('successMessage', xhr.response.message);
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

  //render signup form if redirect is false, else redirect to home
  render() {
    return (
      <div>
      {this.state.redirect === false ? (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />) : (
        <Redirect to='/login' />
      )}
      </div>
    );
  }
}

export default SignUpPage;