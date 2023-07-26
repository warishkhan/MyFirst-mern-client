import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Contact = () => {

    const navigate = useNavigate();

    const[userData,setUserData] = useState({name:"", email:"", phone:"", message:""})
 
   const callAccountpage = async () =>{
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
       setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
 
        if(!res.status === 200){
         const error = new Error(res.error);
         throw error;
        }
 
     } catch (error) {
       console.log(error);
       navigate('/login')
     }
   }
 
   useEffect(()=>{
   
    callAccountpage();
 // eslint-disable-next-line
   }, []);

   const handleInputs = (e)=>{
     const name = e.target.name;
     const value = e.target.value;

     setUserData({...userData, [name]:value})
   }

   const sendData = async(e)=>{
e.preventDefault();
  

const {name,email,phone,message} = userData;

const res = await fetch('/contact',{
    method: "POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,email,phone,message
    })
});
console.log("hello1");

const data = await res.json();

if(!data){
    alert("message not send");
}else{
    alert("Message Send");
    setUserData({...userData, message:""});
}

   }

  return (
    <div>
     <div className="contact-header">
        <div className='content'>
            <div className="img">
                <i className='fa fa-mobile'></i>
            </div>
            <div className='font-div'>
                <h1>Phone</h1>
                <p>+916202052523</p>
            </div>
        </div>
        <div className='content'>
            <div className="img">
                <i className='fa fa-message'></i>
            </div>
            <div className='font-div'>
                <h1>Message</h1>
                <p>warishkhan790@gmail.com</p>
            </div>
        </div>
        <div className='content'>
            <div className="img">
                <i className='fa fa-location'></i>
            </div>
            <div className='font-div'>
                <h1>Address</h1>
                <p>Dhanbad-Jharkhand,India</p>
            </div>
        </div>
     </div>
     <div className="contact-form">
        <form method='POST' className="contact-content">
            <h1>Get in Touch</h1>
            <div className="contact-input">
                <input type="text" onChange={handleInputs}  placeholder='Your name' name='name' value={userData.name}/>
                <input type="email" onChange={handleInputs}  placeholder='Your email' name='email' value={userData.email}/>
                <input type="phone" onChange={handleInputs}  placeholder='Your Phone number' name='phone' value={userData.phone}/>
            </div>
            <textarea name="message" onChange={handleInputs} id="" cols="30" rows="50" 
            value={userData.message} placeholder='Write your message here'></textarea>
            <button type='submit' className='btn' onClick={sendData}>Send Message</button>
        </form>
     </div>
    </div>
  )
}

export default Contact
