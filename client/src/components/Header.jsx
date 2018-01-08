import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth';
import {Redirect} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


class Header extends React.Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      SiteText: 'Mix It',
      loginText: 'Log In',
      signupText: 'Sign up',
      userWelcomeText: 'Welcome ',
      redirect: false
    };

  }

  onLogOutClicked()
  {
    Auth.deauthenticateUser();    
  }

  render() {
    return (
    <BrowserRouter>
    <div className="top-bar">
        <div className="top-bar-left">
            <img alt="" className="mainLogo"/>
            <Link to="/"></Link>
        </div>

        <div>
        {Auth.isUserAuthenticated() == true ? (

            <div className="top-bar-left">

                  {this.state.userWelcomeText} {JSON.parse(localStorage.getItem('usrname')).name}!

            </div>  
            ):
            (

            <div>
            </div>  

            )}

        </div>

        {Auth.isUserAuthenticated() == false ? (
        <div className="top-bar-right">
                 <Link to="/login">{this.state.loginText}</Link> 
                <Link to="/signup">{this.state.singupText}</Link>   
        </div>
        ):
        (
        <div className="top-bar-right">
                 <Link to="/login" onClick={this.onLogOutClicked}>Log out</Link> 
        </div>
        )
        }
    </div>
    </BrowserRouter>
    );
  }
}

export default Header