import React, {useEffect, useState } from 'react'
import Card from '../player/card'
import Lists from '../player/Lists'
import musics from "../component/data/Data";
import logo from '../assets/images/pngwing.com (5).png';
import fb from '../assets/images/pngwing.com (23).png'
import insta from '../assets/images/pngwing.com (24).png'
import twitter from '../assets/images/pngwing.com (25).png'
import { NavLink,useNavigate } from 'react-router-dom'


const Home = () => {

 const [search,setSearch] = useState('') 

const[musicNumber,setMusicNumber] = useState(0)
const[open,setOpen] = useState(false)

const[userName,setUserName] = useState('');
const navigate = useNavigate();

useEffect(()=>{
  
  let light = document.querySelector("body");
  let input = document.querySelector("input");

  input.addEventListener('input', ()=>{
    light.style.borderRadius = input.value;
    light.style.backgroundColor = input.value;
    light.style.width = input.value;
  });
},[])

const searchText = (e) =>{
  setSearch(e.target.value);
}

let dataSearch = musics.filter(item =>{
  return Object.keys(item).some(key =>
    item[key].toString().toLowerCase().includes(search.toString().toLowerCase())
  )
})

const callHomepage = async () =>{
  try {
    const res = await fetch('/getdata',{
         method: "GET",
         headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
         },
         credentials:"include"
    });

    const data = await res.json();
    setUserName(data.name);

  } catch (error) {
    console.log(error);
    navigate('/login')
  }
}

useEffect(()=>{

 callHomepage();
// eslint-disable-next-line
}, []);

  return (
    <>
    <div className="music-container" id='box'>
    <main>
    <div className="sidebar">
     <div className="logo">
      <img src={logo} alt="" />
     </div>

     <div className="name">
      <i className='fa fa-user'></i>
      <h3>{userName}</h3>
     </div>
     <div className="logo">
      <a href="https://www.facebook.com/" rel="noreferrer"  target='_blank'><img src={fb} alt="fb" /></a>
      <a href="https://www.instagram.com/" rel="noreferrer"  target='_blank'><img src={insta} alt="insta" /></a>
      <a href={'https://twitter.com/login'} rel="noreferrer"  target='_blank'><img src={twitter} alt="youtube" /></a>
     </div>
     <ul>
      <li>
        <i className='fa fa-music'></i>
        <NavLink to="/" className="link">My Music</NavLink>
      </li>
      <li>
        <i className='fa fa-home'></i>
        <NavLink to="/" className="link">Explore</NavLink>
      </li>
      <li>
      <i className="fa fa-users" aria-hidden="true"></i>
        <NavLink to="/account" className="link">Profile</NavLink>
      </li>
      <li>
        <i className='fa fa-cog'></i>
        <NavLink to="/account" className="link">Setting</NavLink>
      </li>
      <li>
      <i className="fa fa-headphones" aria-hidden="true"></i>
        <NavLink to="#" className="link">Genre</NavLink>
      </li>
      <li>
      <i className="fa fa-heart" aria-hidden="true"></i>
        <NavLink to="#" className="link">Favourite</NavLink>
      </li>
      <li>
      <i className="fa fa-question-circle" aria-hidden="true"></i>
        <NavLink to="/contact" className="link">Help</NavLink>
      </li>
      <li>
      <i className="fa fa-plus-circle" aria-hidden="true"></i>
        <NavLink to="/register" className="link">Create Account</NavLink>
      </li>
      <li>
      <i className="fa fa-sign-out" aria-hidden="true"></i>
        <NavLink to="/logout" className="link">Log-Out</NavLink>
      </li>
     </ul>
    </div>
    <div className="header-container">
      <div className="search">
        <input type="search" value={search} onChange={searchText.bind(this)} 
        autoComplete="off" placeholder='Search here'/>
      </div>
      <div className='welc'>
        <h1>{userName}</h1>
      </div>
    </div>
    <div className="card-container">
    
      {
        dataSearch.map((music, index)=>(
          <div className="main-card" key={music.id} onClick={()=>setMusicNumber(index)}>
          <div className="box"  >
        <div className="box-content">
          <div className="front">
          <img src={music.thumbnail} alt="" />            
          </div>
          <div className="back">
          <p>{music.title}</p>
            <h3>{music.artists}</h3>
          </div>
        </div>
      </div>
      </div>
        ))
      }
    </div>
     <Card props={{musicNumber,setMusicNumber, setOpen}}/> 
     <Lists props={{open,setOpen,musicNumber,setMusicNumber}}/>
     </main>
     </div>
    </>
  )
}

export default Home
