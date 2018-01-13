import React from "react";
import "./Controls.css";
import "../App.css";

// Controls
class VolumeControls extends React.Component {
  render() {
    return (
      <div className="VolumeControls">
        <button
          id="down"
          className="btn down"
          onClick={this.props.onClick}>
          <i class="fa fa-arrow-down"></i>
        </button>
        <span className="inset-text-effect">Volume&nbsp;&nbsp;</span>
        <button
          id="up"
          className="btn up"
          onClick={this.props.onClick}>
          <i class="fa fa-arrow-up"></i>
        </button>        
      </div>
    );
  }
}

export default VolumeControls;