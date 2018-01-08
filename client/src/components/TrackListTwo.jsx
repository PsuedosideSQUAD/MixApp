import React from "react";
import "./TrackList.css";
import data from "../tracks.json";

// TrackList
class TrackListTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tracks : []}
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    //fetch data for a track here (i.e. from Spotify or Soundcloud)s
    this.setState({ tracks: data.tracksTwo });
  }
  
  renderListItem(track, i) {
    let trackClass = this.props.currentTrackIndexTwo === track.id
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
        onClick={()=>{this.props.selectTrackNumberTwo(track.id)}}
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

export default TrackListTwo;