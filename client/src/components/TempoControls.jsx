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
          className="fa fa-fw fa-slower"
          onClick={this.props.onClick}>
          -
        </button>
        <button
          id="faster"
          className="fa fa-fw fa-faster"
          onClick={this.props.onClick}>
          +
        </button>
        <button
          id="normalTempo"
          className="fa fa-fw fa-normal"
          onClick={this.props.onClick}>
          Reset Tempo
        </button>
      </div>
    );
  }
}

export default TempoControls;