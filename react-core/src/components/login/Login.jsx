import React from 'react'
import loginImg from "../../media/login.svg"
import "./LoginStyle.css"
import { useDispatch } from 'react-redux'
import { getUser, getUserLogin} from "./loginSlice"
import { useEffect } from 'react'

const Login = (props) => {
  const dispatch = useDispatch()
  useEffect(()=> {
    // dispatch(getUser({
    //   name: "hari",
    //   email: "harikrishna03092@gmail.com",
    //   password: 123445
    // }))

    dispatch(getUserLogin({
      email: "harikrishna03092@gmail.com",
      password: 123445
    }))
  },[])

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
          <input type="email" name="email" placeholder="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password" />
        </div>
      </div>
    </div>
    <div className="footer">
      <button type="button" className="btn">
        Login
      </button>
    </div>
  </div>
  )
}

export default Login