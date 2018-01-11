import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home.jsx'
import LoginPage from '../containers/LoginPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';

class Main extends React.Component {
  
  render() {
    return (
          <main>
            <Switch>
              <Route exact path='/' render={() => <Home cardtitleP='MixIt' cardsubtitleP='Welcome to Mix It! Log in to mix some sick beats.'/>}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
            </Switch>
          </main>
    )
  }
}

export default Main