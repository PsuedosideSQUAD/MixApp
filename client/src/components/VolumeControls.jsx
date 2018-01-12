import React from "react";
import "./Controls.css";
import "../App.css";

// Controls
class VolumeControls extends React.Component {
  render() {
    return (
      <div className="VolumeControls">
        <h3>Volume</h3>
        <button
          id="down"
          className="fa fa-fw fa-slower"
          onClick={this.props.onClick}>
          -
        </button>
        <button
          id="up"
          className="fa fa-fw fa-faster"
          onClick={this.props.onClick}>
          +
        </button>        
      </div>
    );
  }
}

export default VolumeControls;