import React from "react";
import "./TrackList.css";
import "../App.css";
import data from "../tracks.json";

// TrackList
class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tracks : []}
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    //fetch data for a track here (i.e. from Spotify or Soundcloud)
    this.setState({ tracks: data.tracks });
  }
  
  renderListItem(track, i) {
    let trackClass = this.props.currentTrackIndex === track.id
      ? "selected"
      : "";
    return (
      <li
        key={track.id}
        className={trackClass}
        ref={cur => {
          if (this.props.currentTrackIndex === track.id) {
            this.activeTrack = cur;
          }
        }}
        onClick={()=>{this.props.selectTrackNumber(track.id)}}
      >
        <div className="number">{track.id}</div>
        <div className="title">{track.title}</div>
        <div className="artist">{track.artist}</div>
        <div className="duration">{track.duration}</div>
      </li>
    );
  }
  render() {
    let tracks = this.state.tracks.map(this.renderListItem);
    return (
      <ul
        className="TrackList"
        ref={input => {
          this.trackList = input;
        }}
      >
        {tracks}
      </ul>
    );
  }
}

export default TrackList;