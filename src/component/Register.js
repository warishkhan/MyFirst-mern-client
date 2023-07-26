import React, { useState } from "react";
import { NavLink ,useNavigate} from 'react-router-dom'
import pngwing from '../assets/images/pngwing.com (3).png'

const Register = () => {

  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",email:'',phone:"",work:"",password:"",cpassword:""
  })
  
const handleInput =(e)=>{
  const name = e.target.name;
  const value = e.target.value;

  setUser({...user, [name]:value})
}

const postData = async(e) =>{
e.preventDefault();
 const {name, email, phone, work, password, cpassword} = user;

 const res = await fetch('/register',{
  method:"POST",
  headers:{
    "Content-Type" : "application/json",
  },
  body: JSON.stringify({
    name, email, phone, work, password, cpassword
  })
 })
 
 const data = await res.json();

 if(data.status === 422 || !data){
  window.alert("Invalid Registration")
 }else{
  window.alert("Registration Successful")

  navigate("/login")
 }

}

  return (
    <div className="register">
      <div className="register-form ">
        <h1>Sign up</h1>
        <form method="POST" className="form-group">
          <div className="form-input">
            <label htmlFor="name">
              <i className="fa fa-user"></i>
            </label>
            <input type="text" placeholder="Your name" name="name" onChange={handleInput} value={user.name} autoComplete="off"/> 
          </div>

          <div className="form-input">
            <label htmlFor="email">
              <i className="fa fa-message"></i>
            </label>
            <input type="email" placeholder="Your Email" name="email" onChange={handleInput} value={user.email} autoComplete="off"/>
          </div>

          <div className="form-input">
            <label htmlFor="phone">
              <i className="fa fa-phone"></i>
            </label>
            <input type="phone" placeholder="Your Phone" name="phone" onChange={handleInput} value={user.phone} autoComplete="off"/>
          </div>

          <div className="form-input">
            <label htmlFor="work">
              <i className="fa fa-box"></i>
            </label>
            <input type="text" placeholder="Your Profession" name="work" onChange={handleInput} value={user.work} autoComplete="off"/>
          </div>

          <div className="form-input">
            <label htmlFor="password">
              <i className="fa fa-lock"></i>
            </label>
            <input type="password" placeholder="password" name="password" onChange={handleInput} value={user.password} autoComplete="off"/>
          </div>

          <div className="form-input">
            <label htmlFor="cpassword">
              <i className="fa fa-lock"></i>
            </label>
            <input type="password" placeholder="Confirm your password" name="cpassword" onChange={handleInput} value={user.className} autoComplete="off"/>
          </div>
          <div className="btn-div">
            <input type="submit" value="Submit" className="btn" onClick={postData}/>
          </div>
        </form>
      </div>
      <div className="register-img">
        <figure>
            <img src={pngwing} alt="" />
        </figure>
        <NavLink to="/login" className="log">I am already register</NavLink>
      </div>
    </div>
  );
};

export default Register;
