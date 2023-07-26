import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {UserContext} from '../App';

const Logout = () => {

    const {dispatch} = useContext(UserContext)

    const navigate = useNavigate();

useEffect(()=>{
    fetch('/logout',{
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }).then((res) =>{
        dispatch({type:"USER", payload:false})
         navigate('/login',{replace:true});

         if(res.status !== 200){
            const error = new Error(res.error);
            throw error;
         }
    }).catch((error)=>{
        console.log({error:"Error in logout"});
    })
})

  return (
    <div>
      <h1>Logout succesfully</h1>
    </div>
  )
}

export default Logout
