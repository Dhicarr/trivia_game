
import Sound from 'react-sound';
import { useState, useEffect } from "react";
import {IconButton } from "@mui/material";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const Background = ({ }) => {
  const [audio, setAudio] = useState(false);
  const [audioPosition, setAudioPosition] = useState(0);

  const handlePlaying = (ev) => {
    setAudioPosition(ev.position);
  }
  const handleAudioClick = () => {
    setAudio(!audio)
  }
  
  return (
    <div className="Background">
      <Sound
        url="https://freelistenonline.com/music/vkstream/80186612"
        playStatus={audio ? Sound.status.PLAYING : Sound.status.PAUSED}
        playFromPosition={audioPosition}
        onPlaying={()=>handlePlaying}
        loop={true}
      />
      <div className="musicNoteContainer">
        <IconButton onClick={handleAudioClick}>
          {audio ?
          <MusicNoteIcon style={{color:"white", height:"50px", width:"50px"}} /> :
          <MusicOffIcon style={{color:"white", height:"50px", width:"50px"}} />
          }
        </IconButton>
      </div>
    </div>
  );
}

export default Background;
