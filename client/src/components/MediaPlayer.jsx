import React from "react";
import '../App.css';
import Controls from "./Controls";
import TrackList from "./TrackList";
import Dropdown from 'react-dropdown';

// Data
import data from "../tracks.json";
const options = data.tracks.map(getTrackOption);
const tracks = data.tracks;
console.log(options);

function getTrackOption(track, index) {
    return { value: track.id, label: track.title + " by " + track.artist };
}

// App
class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      options: options,
      selected: options[0],
      currentTrackIndex: tracks[0].id
    };
    this._onSelect = this._onSelect.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.selectTrackNumber = this.selectTrackNumber.bind(this);
    this.changeTempo = this.changeTempo.bind(this);
  }

  _onSelect (option) {
    this.setState({
      selected: option,
      currentTrackIndex: option.value,
      playing: true
    }, this.playAudio);
  }

  changeTempo(){

  }
  playAudio(){
    this.audioElement.load();
    this.audioElement.play();
  }
  pauseAudio(){
    this.audioElement.pause();
  }
  selectTrackNumber(trackId){
    this.setState({currentTrackIndex:trackId,playing:true},this.playAudio);
  }
  handleClick(e) {
    switch (e.target.id) {
      case "play":
        this.setState((state, props) => {
          let currentTrackIndex = state.currentTrackIndex;
          if (currentTrackIndex === 0) {
            currentTrackIndex = 1;
          }
          return {
            playing: true,
            currentTrackIndex: currentTrackIndex
          };
        },this.playAudio);
        break;
      case "pause":
        this.setState({ playing: false },this.pauseAudio);
        break;
      case "prev":
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex - 1;
          if (currentIndex <= 0) {
            currentIndex = this.state.options.length;
          }
            return { 
              playing: true,
              currentTrackIndex: currentIndex,
              selected: this.state.options.find(function(option) {
                return option.value === currentIndex
              })
            };   
        },this.playAudio);
        break;
      case "next":
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex + 1;
          if (currentIndex > this.state.options.length) {
            currentIndex = 1;
          }
            return { 
              playing: true,
              currentTrackIndex: currentIndex,
              selected: this.state.options.find(function(option) {
                return option.value === currentIndex
              })
            };
        },this.playAudio);
        break;
      default:
        break;
    }
  }

  render() {

    const options = this.state.options
    const defaultOption = this.state.selected

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6" id="playerOne" align="center">
              <div className="MediaPlayer">
                <div className="Artwork">
                  <Controls onClick={this.handleClick} playing={this.state.playing} />
                  <audio ref={(audio)=>{this.audioElement = audio}} src={"/songs/"+this.state.currentTrackIndex+".mp3"}/>
                </div>
                <Dropdown className="SongDropdown" options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select A Song" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MediaPlayer;