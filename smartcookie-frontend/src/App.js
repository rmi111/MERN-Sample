import React, { Component } from "react";
import ReactPlayer from "react-player";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./index.css";
import "./style.css";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import video from './video.mp4'

const choices = ['5', '3', '8', '4'];

class App extends Component {
  state = {
    url: video,
    open: false,
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    showDialog: false,
    showDialogError: false,
    played: 0,
    questionAppeared: false,
    answerMatched: false,
    input: "",
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  //const [open, setOpen] = React.useState(false);

  handleClickOpen = () => {
    //setOpen(true);
  };

  handleClose = () => {
    //setOpen(false);
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing , controls: !this.state.controls })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleListItemClick = (value) => {
    //onClose(value);
    if(value === '5')
    {
      this.setState({ answerMatched : true, playing: true });
      this.setState({ open: false });
    }
    else{
      this.setState({ showDialogError: true });
      
    }
  };

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleOnPlaybackRateChange = (speed) => {
    this.setState({ playbackRate: parseFloat(speed) })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true , controls: false })
  }
 
  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state);
    this.setState({ loaded: state.playedSeconds })
    if(state.playedSeconds > 64 && !this.state.questionAppeared)
    {
      this.setState({ open: true , playing: false, questionAppeared: true })
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  _onChange(e) {
    let input = e.target.value;

    this.setState({ input });
}

  ref = player => {
    this.player = player
  }

  render () {
    const { url, playing, controls, open, showDialogError, answerMatched } = this.state
   
    return (
      <div className="container">
        <div className='app'>

            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              controls={controls}
              // onReady={() => console.log('onReady')}
              // onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              // onBuffer={() => console.log('onBuffer')}
              // onPlaybackRateChange={this.handleOnPlaybackRateChange}
              // onSeek={e => console.log('onSeek', e)}
              // onEnded={this.handleEnded}
              // onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              // onDuration={this.handleDuration}
            />

            <Dialog open={ open && !answerMatched } onClose={this.handleClose}>
              <DialogTitle>Choose your answer:</DialogTitle>
              <DialogContent>
                <DialogContentText>
                “3 + 2 = ?”
                </DialogContentText>
                {showDialogError === true ?
                <DialogContentText>
                “Wrong answer! try again”
                </DialogContentText>
                : null}
                <List sx={{ pt: 0 }}>
                {choices.map((choice) => (
                  <ListItem button onClick={() => this.handleListItemClick(choice)} key={choice}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={choice} />
                  </ListItem>
                ))}
            </List>
          </DialogContent>
        </Dialog>
          
        </div>
      </div>
    )
  }
}

export default (App)

