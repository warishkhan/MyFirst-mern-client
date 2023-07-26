import React, { useEffect, useRef, useState } from 'react'
import '../assets/cardcss/card.css'

import musics from '../component/data/Data'
import { timer } from '../utils/timer';
import { visualizer } from '../utils/visualizer';

const Card = ({props:{musicNumber,setMusicNumber,setOpen}}) => {

  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  
  const [play, setPlay] = useState(false);

  const[showVolume,setShowVolume] = useState(false);
  
  const [volume, setVolume] = useState(50);
  
  const [repeat, setRepeat] = useState('repeat');

const audioRef = useRef()
const canvasRef = useRef()

  function handleLoadStart(e){
    setDuration(audioRef.current.duration)
    if(play){audioRef.current.play()};
  }

  function handlePlayingAudio(){
    visualizer(audioRef.current, canvasRef.current, play)
    if(play){
      audioRef.current.pause();
      setPlay(false)
    }else{
      audioRef.current.play();
      setPlay(true)
    }
  }

 function handleTimeUpdate(){
  const currentTime = audioRef.current.currentTime;
  setCurrentTime(currentTime)
 }

 function changeCurrentTime(e){
  const currentTime = Number(e.target.value);
  audioRef.current.currentTime = currentTime;
  setCurrentTime(currentTime);
 }

 function handleNextPrev(n){
  setMusicNumber(value => {
    if(n > 0)
    return value + n > musics.length - 1 ? 0 : value + n;

    return value + n < 0 ? musics.length - 1 : value + n;
  })
 }

 useEffect(()=>{
audioRef.current.volume = volume /100;
 },[volume])

 function handleRepeat(){
  setRepeat(value => {
    switch(value){
      case "repeat":
        return 'circle';

        case 'circle':
          return 'shuffle';

          default:
            return "repeat"
    }
  })
 }

 function EndedAudio(){
  switch(repeat){
    case 'circle':
      return audioRef.current.play();

      case 'shuffle':
        return handleShuffle();

        default:
          handleNextPrev(1)
  }
 }

 function handleShuffle(){
  const num = randomNumber();
  setMusicNumber(num)
 }

 function randomNumber(){
  const number = Math.floor(Math.random() * (musics.length -1));

  return number;
 }



  return (
    <>
      <div className="card">
        <div className="nav">
        <i className="fa fa-sort-desc" aria-hidden="true"></i>
            <span>Now Playing{musicNumber + 1}/{musics.length}</span>
            <i className="fa fa-bars" aria-hidden="true" onClick={()=>setOpen(prev => !prev)}></i>
        </div>
        <div className="img">
            <img  src={musics[musicNumber].thumbnail} alt="" className={`${play ? "playing" : ""}`}/>
            <canvas ref={canvasRef}/>
        </div>

        <div className="details">
            <p className="title">{musics[musicNumber].title}</p>
            <p className="artists">{musics[musicNumber].artists}</p>
        </div>

        <div className="progress">
            <input type="range" min={0} max={duration} value={currentTime} 
              onChange={e => changeCurrentTime(e)}
              style={{
                background:`linear-gradient(to right,
                #3264fe ${currentTime/duration*100}%,
                #e5e5e5 ${currentTime/duration*100}%)`
              }}
            />
        </div>

        <div className="timer">
            <span>{timer(currentTime)}</span>
            <span>{timer(duration)}</span>
        </div>

        <div className="controls">
            <i className={`fa fa-${repeat}`} onClick={handleRepeat}></i>

            <i className="fa fa-step-backward" aria-hidden="true" id='prev' 
            onClick={()=> handleNextPrev(-1)}></i>

            <div className="play" onClick={handlePlayingAudio} >
            <i className={play ? "fa fa-pause" : "fa fa-play"} aria-hidden="true">
              {/* {
                play ? 'pause' : 'play'
              } */}
            </i>

            </div>
            <i className="fa fa-step-forward" aria-hidden="true" id='next' 
            onClick={()=> handleNextPrev(1)}></i>

            {/* ---volume---- */}

            <i className="fa fa-volume-up" aria-hidden="true" 
            onClick={() => setShowVolume(prev => !prev)}></i>

            <div className={`volume ${showVolume ? 'show' : ''}`}>
            <i onClick={() => setVolume(v => v > 0 ? 0 : 100)}               
            className={volume === 0 ? "fa fa-volume-off" : "fa fa-volume-up"} aria-hidden="true"></i>

            <input type="range" min={0} max={100} value={volume} 
              onChange={e => setVolume(Number(e.target.value))}
             style={{background:`linear-gradient(to right, #3264fe ${volume}%, #e5e5e5 ${volume})`}}/>
            <span>{volume}</span>
            </div>
           
        </div>
        <audio src={musics[musicNumber].src} hidden onLoadedData={handleLoadStart} ref={audioRef}
        onTimeUpdate={handleTimeUpdate} onEnded={EndedAudio} />
      </div>
    </>
  )
}

export default Card
