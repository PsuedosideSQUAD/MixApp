import React from "react";
import "../App.css";

// Controls
class Controls extends React.Component {
  render() {
    return (
      <div className="Controls">
        <i
          id="prev"
          className="fa fa-fw fa-fast-backward"
          onClick={this.props.onClick}
        />
        {!this.props.playing &&
          <img
            id="play"
            src="images/playicon.png"
            onClick={this.props.onClick}
            className="play"
          />}
        {this.props.playing &&
          <img
            id="pause"
            src="images/pauseicon.png"
            onClick={this.props.onClick}
            className="pause"
          />}
        <i
          id="next"
          className="fa fa-fw fa-fast-forward"
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

export default Controls;