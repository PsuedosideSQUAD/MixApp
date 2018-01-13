import React from "react";
import '../App.css';
import Controls from "./Controls";
import Dropdown from 'react-dropdown';
import VolumeControls from "./VolumeControls";
import TempoControls from "./TempoControls";

// Track Info
import BeatTracks from "../TrackInfo/beatTracks.json";
import Top40Tracks from "../TrackInfo/top40Tracks.json"
import AcousticTracks from "../TrackInfo/acousticTracks.json"
import InstrumentalTracks from "../TrackInfo/instrumentalTracks.json"
import RockTracks from "../TrackInfo/rockTracks.json"

const options = BeatTracks.tracks.map(getTrackOption);
const tracks = BeatTracks.tracks;

function getTrackOption(track, index) {
    return { value: track.id, label: track.title + " by " + track.artist };
}
function getSelectObject(object, index) {
  return { value: object, label: object};
}

// App
class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      options: options,
      typeOptions: ["Song", "Beat"].map(getSelectObject),
      selected: null,
      currentTrackIndex: tracks[0].id,
      typeSelected: null,
      genreSelected: null,
      genreOptions: ["Top40", "Acoustic", "Instrumental", "Rock"].map(getSelectObject)
    };
    this._onSelect = this._onSelect.bind(this)
    this.handleTypeSelected = this.handleTypeSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.selectTrackNumber = this.selectTrackNumber.bind(this);
    this.changeTempo = this.changeTempo.bind(this);
    this.resetAudio = this.resetAudio.bind(this);
    this.handleGenreSelected = this.handleGenreSelected.bind(this);
  }

  handleGenreSelected(option) {
    this.setState({
      genreSelected: option.value,
      options: option.value === "Top40" ?
        Top40Tracks.tracks.map(getTrackOption) :
        option.value === "Rock" ?
        RockTracks.tracks.map(getTrackOption) :
        option.value === "Acoustic" ?
        AcousticTracks.tracks.map(getTrackOption) :
        InstrumentalTracks.tracks.map(getTrackOption)
    });
  }

  handleTypeSelected(option) {
    this.setState({
      typeSelected: option.value,
      options: option.value === "Beat" ?
        BeatTracks.tracks.map(getTrackOption) :
        this.state.options
    });
  }

  _onSelect (option) {
    this.setState({
      selected: option,
      currentTrackIndex: option.value,
      playing: true
    }, this.playAudio);
  }

  changeTempo(option){
    this.audioElement.playbackRate();
  }

  resetAudio(){
    this.audioElement.reset();
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
      case "slower":
        this.audioElement.playbackRate === 0 ?
          this.audioElement.playbackRate = .10
          : this.audioElement.playbackRate -= .10; //Prevent slowdown to get to 0
        break;
      case "faster":
        this.audioElement.playbackRate += .10;
        break;
      case "normalTempo":
        this.audioElement.playbackRate = 1;
        break;
      case "down":
        this.audioElement.volume < .10 ?
        this.audioElement.volume = 0
        : this.audioElement.volume -= .10;
        break;
      case "up":
        this.audioElement.volume > .90 ?
        this.audioElement.volume = 1
        : this.audioElement.volume += .10;
        break;
      default:
        break;
    }
  }

  render() {

    const options = this.state.options
    const showBeatsDropdown = this.state.typeSelected === "Beat"
    const showSongDropdown = this.state.genreSelected !== null
    const showSelectTypeDropdown = this.state.typeSelected === null
    const source = "/songs/" + this.state.genreSelected + "/" +this.state.currentTrackIndex + ".mp3"
    const defaultSource = "/songs/Beats/" + this.state.currentTrackIndex + ".mp3"
    const songDropdownPlaceholder = this.state.selected !== null && this.state.selected.label ? this.state.selected.label : "Select A " + this.state.genreSelected + " Song"
    const beatsDropdownPlaceholder = this.state.selected !== null && this.state.selected.label && this.state.genreSelected === null ? this.state.selected.label : "Select A Beat"
    return (
      <div>
            <div id="playerOne" align="center">
              <div className="MediaPlayer">
                <div className="Artwork">
                  <Controls onClick={this.handleClick} playing={this.state.playing} />
                  <audio ref={(audio)=>{this.audioElement = audio}} src={this.state.genreSelected ? source : defaultSource}/>
                </div>
                <VolumeControls onClick={this.handleClick}/>
                <TempoControls onClick={this.handleClick}/>
                {showSelectTypeDropdown ?
                    <Dropdown className="SelectTypeDropdown" options = {this.state.typeOptions} onChange={this.handleTypeSelected} placeholder="Select A Song Or A Beat"/> :
                    showBeatsDropdown ?
                    <Dropdown className="BeatsDropdown" options={options} onChange={this._onSelect} placeholder={beatsDropdownPlaceholder} /> :
                    showSongDropdown ?
                    <Dropdown className="SongDropdown" options={options} onChange={this._onSelect} placeholder={songDropdownPlaceholder} /> :
                    <Dropdown className="GenreDropdown" options = {this.state.genreOptions} onChange={this.handleGenreSelected} placeholder="Select A Genre"/>
                }
              </div>
            </div>
      </div>
    );
  }
}

export default MediaPlayer;