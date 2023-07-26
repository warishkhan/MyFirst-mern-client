import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {UserContext} from '../App';

const Navbar = () => {

  const {state} = useContext(UserContext)

    useEffect(()=>{
        const navbar=document.querySelector(".main-navbar")
        const hambar = document.querySelector('.hambar-navbar')
         
        hambar.onclick = function(){
            navbar.classList.toggle('active')
        }

    })

    useEffect(()=>{
  
      let light = document.querySelector("body");
      let input = document.querySelector("input");
    
      input.addEventListener('input', ()=>{
        light.style.borderRadius = input.value;
        light.style.backgroundColor = input.value;
        light.style.width = input.value;
      });
    },[])

  const RenderMenu = () =>{
    if(state){
      return(
        <>
            <li>
                   <NavLink to="/" className="navlink">Home</NavLink>
                </li>
                <li>
                   <NavLink to="/account" className="navlink">Account</NavLink>
                </li>
                <li>
                   <NavLink to="/contact" className="navlink">Contact</NavLink>
                </li>
                <li>
                   <NavLink to="/logout" className="navlink">Logout</NavLink>
                </li>
        </>
      )
    }else{
      return(
        <>
           <li>
                   <NavLink to="/" className="navlink">Home</NavLink>
                </li>
                <li>
                   <NavLink to="/account" className="navlink">Account</NavLink>
                </li>
                <li>
                   <NavLink to="/contact" className="navlink">Contact</NavLink>
                </li>
                <li>
                   <NavLink to="/login" className="navlink">Login</NavLink>
                </li>
                <li>
                   <NavLink to="/register" className="navlink">Register</NavLink>
                </li>
        </>
      )
    }
  }

  return (
    <>
      <div className="main-navbar">
        <div className="logo-navbar">
            <h2>War</h2>
        </div>
        <input type="search" placeholder='Change Bg'/>
        <div className="hambar-navbar fa fa-bars"></div>
        <div className="navbar">
            <ul>
               <RenderMenu/>
            </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
