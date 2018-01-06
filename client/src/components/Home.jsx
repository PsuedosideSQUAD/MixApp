import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardPage.jsx';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cardtitle: "MixIt",
      cardsubtitle: "Welcome to Mix It! Log in to mix some sick beats.",
    };
  }
  
   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }

  render() {
    return (
      <div>
        {Auth.isUserAuthenticated() == false ? (          
      <Card className="container">
          <CardTitle title={this.props.cardtitleP} subtitle={this.props.cardsubtitleP} />          
      </Card>):
      (
        <DashboardPage/>
      )}
      </div>    
    )
  }  
}

Home.propTypes = {
  cardtitleP: PropTypes.string.isRequired,
  cardsubtitleP: PropTypes.string.isRequired
};

export default Home;