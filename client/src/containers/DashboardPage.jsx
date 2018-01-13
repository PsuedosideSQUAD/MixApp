import React from 'react';
import Auth from '../modules/Auth';
import MediaPlayer from '../components/MediaPlayer.jsx';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      numberOfMediaPlayers: 8
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(numberOfPlayers) {
    this.setState({
      numberOfMediaPlayers: numberOfPlayers
    });
  }

  componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //Set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            this.setState({
            secretData: xhr.response.message
            });
        }
        });
        xhr.send();
  }

  render() {

    //Returning MediaPlayer n times. n = numberOfMediaPlayers
    return (
      <div>
        <div id="mixingBoard" className="container">
        {[...Array(this.state.numberOfMediaPlayers)].map((e, i) =>
              
               <div className="col-md-3" align="center" key={i}>
                <MediaPlayer />
               </div>
            
          )}
        </div>
      </div>
    );
  }
}

export default DashboardPage;