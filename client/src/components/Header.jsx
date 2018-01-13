import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth';

class Header extends React.Component {

  constructor(props) {
    super(props);

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
    <div className="top-bar">
    <div id="header">
        <img src={'mixitlog.png'} alt="logo" className="img-responsive"/> 
    </div>

        <div id="musicBG">
        {Auth.isUserAuthenticated() === true ? (
            <div className="top-bar-left">
                  {this.state.userWelcomeText} {JSON.parse(localStorage.getItem('usrname')).name}!
            </div>  
            ) : (
            <div>
            </div>
            )}
        </div>

        {Auth.isUserAuthenticated() === false ? (
        <div className="top-bar-right">
                <Link to="/login">{this.state.loginText}</Link> 
                <Link to="/signup">{this.state.singupText}</Link>   
        </div>
        ) : (
        <div className="top-bar-right">
                <Link to="/login" onClick={this.onLogOutClicked}><i className="fa fa-user">&nbsp;&nbsp;<span id="logoutText">Log out</span></i></Link> 
        </div>
        )}
    </div>
    );
  }
}

export default Header