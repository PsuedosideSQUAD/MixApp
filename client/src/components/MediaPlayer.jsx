import React from "react";
import '../App.css';
import Controls from "./Controls";
import ControlsTwo from "./ControlsTwo";
import TrackList from "./TrackList";
import TrackListTwo from "./TrackListTwo";

// Data
import data from "../tracks.json";

// App
class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      playingTwo: false,
      currentTrackIndex: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.playAudioTwo = this.playAudioTwo.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.pauseAudioTwo = this.pauseAudioTwo.bind(this);
    this.selectTrackNumber = this.selectTrackNumber.bind(this);
    this.selectTrackNumberTwo = this.selectTrackNumberTwo.bind(this);
  }
  playAudio(){
    this.audioElement.load();
    this.audioElement.play();
  }
  playAudioTwo(){
    this.audioElement.load();
    this.audioElement.play();
  }
  pauseAudio(){
    this.audioElement.pause();
  }
  pauseAudioTwo(){
    this.audioElement.pause();
  }
  selectTrackNumber(trackId){
    this.setState({currentTrackIndex:trackId,playing:true},this.playAudio);
  }
  selectTrackNumberTwo(trackId){
    this.setState({currentTrackIndex:trackId,playingTwo:true},this.playAudioTwo);
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
            return null;
          } else {
            return { playing:true,currentTrackIndex: currentIndex };
          }
        },this.playAudio);
        break;
      case "next":
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex + 1;
          if (currentIndex > data.tracks.length) {
            return null;
          } else {
            return { playing:true,currentTrackIndex: currentIndex };
          }
        },this.playAudio);
        break;
      default:
        break;
    }
  }

  handleClickTwo(f) {
    switch (f.target.id) {
      case "play":
        this.setState((state, props) => {
          let currentTrackIndex = state.currentTrackIndex;
          if (currentTrackIndex === 0) {
            currentTrackIndex = 1;
          }
          return {
            playingTwo: true,
            currentTrackIndex: currentTrackIndex
          };
        },this.playAudioTwo);
        break;
      case "pause":
        this.setState({ playingTwo: false },this.pauseAudioTwo);
        break;
      case "prev":
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex - 1;
          if (currentIndex <= 0) {
            return null;
          } else {
            return { playingTwo:true,currentTrackIndex: currentIndex };
          }
        },this.playAudioTwo);
        break;
      case "next":
        this.setState((state, props) => {
          let currentIndex = state.currentTrackIndex + 1;
          if (currentIndex > data.tracksTwo.length) {
            return null;
          } else {
            return { playingTwo:true,currentTrackIndex: currentIndex };
          }
        },this.playAudioTwo);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6" id="playerOne" align="center">
            <div className="MediaPlayer">
              <div
                className="Artwork"
                style={{ backgroundImage: "url(" + data.artwork + ")" }}
              >
                <Controls onClick={this.handleClick} playing={this.state.playing} />
                <audio ref={(audio)=>{this.audioElement = audio}} src={"/songs/"+this.state.currentTrackIndex+".mp3"}/>
              </div>
              <TrackList
                currentTrackIndex={this.state.currentTrackIndex}
                selectTrackNumber={this.selectTrackNumber}
              />
              <div className="MusicCredit">Play a Song.</div>
            </div>
          </div>
          <div className="col-md-6" id="playerTwo" align="center">
            <div className="MediaPlayer">
              <div
                className="Artwork"
                style={{ backgroundImage: "url(" + data.artwork + ")" }}
              >
                <ControlsTwo onClick={this.handleClickTwo} playingTwo={this.state.playingTwo} />
                <audio ref={(audio)=>{this.audioElement = audio}} src={"/songs/"+this.state.currentTrackIndex+".mp3"}/>
              </div>
              <TrackListTwo
                currentTrackIndex={this.state.currentTrackIndex}
                selectTrackNumberTwo={this.selectTrackNumberTwo}
              />
              <div className="MusicCredit">Play a Different Song.</div>
            </div>
          </div>
        </div>
      </div>

      </div>

    );
  }
}

export default MediaPlayer;

