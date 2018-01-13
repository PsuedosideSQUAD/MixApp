import React from "react";
import "./Controls.css";
import "../App.css";

// Controls
class TempoControls extends React.Component {
  render() {
    return (
      <div className="TempoControls">
        <button
          id="slower"
          className="btn slower"
          onClick={this.props.onClick}>
          -
        </button>
        <button
          id="normalTempo"
          className="btn normal"
          onClick={this.props.onClick}>
          Reset Tempo
        </button>
        <button
          id="faster"
          className="btn faster"
          onClick={this.props.onClick}>
          +
        </button>
      </div>
    );
  }
}

export default TempoControls;