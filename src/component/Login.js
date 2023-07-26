import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img from "../assets/images/pngwing.com (18).png";
import {UserContext} from '../App';

const Login = () => {

const {dispatch} = useContext(UserContext)

const[email,setEmail] = useState('');
const [password,setPassword] = useState('');

const navigate = useNavigate();

const handleInput = async(e)=>{
e.preventDefault();
const res = await fetch('/login',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    email,password
  })
})
const data = await res.json();
if(data.status === 400 || !data){
  window.alert("Invalid credentials")
}else{
  window.alert("Login successful");
  dispatch({type:"USER", payload:true})
  navigate("/")
}
}

  return (
    <div className="register">
    <div className="register-img">
        <figure>
          <img src={img} alt="" />
        </figure>
        <NavLink to="/register" className="log">
          Create an account
        </NavLink>
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <form action="" className="form-group">
          
          <div className="form-input">
            <label htmlFor="email">
              <i className="fa fa-user"></i>
            </label>
            <input type="email" name="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <div className="form-input">
            <label htmlFor="cpassword">
              <i className="fa fa-lock"></i>
            </label>
            <input type="password" name="password" placeholder="Confirm your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="btn-div">
            <input type="submit" value="Submit" className="btn" onClick={handleInput} />
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
