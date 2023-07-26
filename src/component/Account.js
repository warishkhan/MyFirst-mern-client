import React, { useEffect, useState } from 'react'
import userpng from '../assets/images/User.png'
import {useNavigate} from 'react-router-dom'



const Account = () => {

   const navigate = useNavigate();

   const[img,setImg] = useState({})
 
   const[userData,setUserData] = useState({})

  const[index,setIndex]= useState(1)

  const change =(index)=>{
    return setIndex(index)
  }

  const callAccountpage = async () =>{
    try {
      const res = await fetch('/account',{
           method: "GET",
           headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
           },
           credentials:"include"
      });

      const data = await res.json();
      setUserData(data);

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

  useEffect(()=>{
    const imgDiv = document.querySelector('.img');
    const img = document.querySelector('#photo');
    const file = document.querySelector('#file');
    const uploadBtn = document.querySelector('#uploadBtn');
 
    imgDiv.addEventListener('mouseenter',function(){
     uploadBtn.style.display = "block";
    });
 
    imgDiv.addEventListener('mouseleave',function(){
     uploadBtn.style.display ="none";
    });
 
   file.addEventListener('change',function(){
     const choosedFile =this.files[0];
     if(choosedFile){
 const reader = new FileReader();
 
 reader.addEventListener('load',function(){
   img.setAttribute('src',reader.result);
 
   
 });
 reader.readAsDataURL(choosedFile)

 setImg(choosedFile)
     }
   })
  },[]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-img">
            <div className="img">
            <img src={userData.name === img.name ? img.name : userpng} alt="" id='photo' />
            <input type="file" id='file' />
            <label htmlFor="file" id='uploadBtn'>Choose Photo</label>
            </div>
            <h3>WORK LINK</h3>   
           <p> <a href="www.youtube.com" target='_blank'>YouTube</a></p>
           <p> <a href="www.instagram.com" target='_blank'>Instagram</a></p>
           <p> <a href="www.facebook.com" target='_blank'>Facebook</a></p>
           <p> <a href="www.GitHub.com" target='_blank'>GitHub</a></p>
           <p> <a href="www.CodePen.com" target='_blank'>CodePen</a></p>
          </div>

          <div className="profile-text">
            <div className="profile-header">
              <div className="profile-heading">
                <h2>{userData.name}</h2>
                <span>{userData.work}</span>
                <p>Ranking <span>1/10</span></p>
              </div>
              <button>Edit Profile</button>
            </div>
            <div className="profile-tab">
              <button className={index===1? "button button-active":"button"} onClick={()=>change(1)}>About</button>
              <button className={index===2? "button button-active":"button"}  onClick={()=>change(2)}>Timeline</button>
              <div className={index===1?'tab-panel':'panel-active'} onClick={()=>change(1)}>
                <div className="tab-text">
                  <h2>User Id</h2>
                  <span>789998675643353</span>
                </div>
                <div className="tab-text">
                  <h2>Name</h2>
                  <span>{userData.name}</span>
                </div>
                <div className="tab-text">
                  <h2>Email</h2>
                  <span>{userData.email}</span>
                </div>
                <div className="tab-text">
                  <h2>Phone</h2>
                  <span>{userData.phone}</span>
                </div>
                <div className="tab-text">
                  <h2>Profession</h2>
                  <span>{userData.work}</span>
                </div>
              </div>
              <div className={index===2?'tab-panel':'tab-active'} onClick={()=>change(2)}>
                <div className="tab-text">
                  <h2>Experience</h2>
                  <span>Intermediate</span>
                </div>
                <div className="tab-text">
                  <h2>Hourly Rate</h2>
                  <span>10$/hr</span>
                </div>
                <div className="tab-text">
                  <h2>Total Projects</h2>
                  <span>130</span>
                </div>
                <div className="tab-text">
                  <h2>English Level</h2>
                  <span>Fluent</span>
                </div>
                <div className="tab-text">
                  <h2>Availiability</h2>
                  <span>6 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
