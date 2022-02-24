import React from 'react'
import loginImg from "../../media/login.svg"
import "./LoginStyle.css"
import { useDispatch } from 'react-redux'
import {  getUserLogin} from "./loginSlice"
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Login = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handleLogin = () => {
    if(!email || !password) return;
    dispatch(getUserLogin({
      email,
      password
    }))
    
    history.push("/")
  }
  return (
    <div className="base-container Login" ref={props.containerRef}>
    <div className="header">Login</div>
    <div className="content">
      <div className="image">
        <img src={loginImg} />
      </div>
      <div className="Form">
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input type="email" name="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      </div>
    </div>
    <div className="footer">
      <button type="button" className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
  )
}

export default Login