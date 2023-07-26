import React,{useState,useEffect} from "react";
import "../assets/cardcss/list.css";
import musics from "../component/data/Data";
import { timer } from "../utils/timer";
const Lists = ({ props: { open, setOpen, musicNumber, setMusicNumber } }) => {
  return (
    <>
      <div className={`list ${open ? 'show' : ''}`}>
        <div className="header">
          <div>
            <i className="fa fa-bars"></i>
            <span>Music list</span>
          </div>
          <i className="fa fa-close" onClick={()=>setOpen(false)}></i>
        </div>
        <ul>
            {
                musics.map((music, index)=>(
                    <li key={music.id} onClick={()=>setMusicNumber(index)} 
                    className={`${musicNumber === index ? 'playing' : ''}`}>
                        <div className="row">
                            <span>{music.title}</span>
                            <p>{music.artists}</p>
                        </div>
                        <Duration music={music}/>
                    </li>
                ))
            }
        </ul>
      </div>
    </>
  );
};

export default Lists;


const Duration = ({music})=>{
  const [duration, setDuration] = useState(0);

  useEffect(()=>{
    const audio = new Audio(music.src)
    audio.onloadedmetadata = function(){
      if(audio.readyState > 0){
        setDuration(audio.duration)
      }
    }
// console.log(music);
  },[music])
  return(
    <>
      <span className="duration">{timer(duration)}</span>
    </>
  )
}