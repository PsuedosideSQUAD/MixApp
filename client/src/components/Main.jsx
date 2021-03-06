import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home.jsx'
import LoginPage from '../containers/LoginPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import {withRouter} from 'react-router'

class Main extends React.Component {
  
  render() {
    return (
        <main>
            <Switch>
              <Route exact path='/' render={() => <Home cardtitleP='MixIt' cardsubtitleP='Welcome to Mix It! Log in to mix some sick beats.'/>}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
            </Switch>
            <div id="footer">
              <i className="fa fa-cogs"><span id="footerText">&nbsp;&nbsp;Created 2017 by PsuedosideSQUAD</span></i>
            </div>
        </main>
    )
  }
}

export default withRouter(Main);