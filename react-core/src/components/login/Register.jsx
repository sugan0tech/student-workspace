import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import loginImg from "../../media/login.svg"
import "./LoginStyle.css"
import { getUser } from './loginSlice'

const Register = (props) => {
  const dispatch = useDispatch()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName] = useState("")
  useEffect(()=> {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  },[])
  const handleRegister = (e)=> {
    e.preventDefault();
    if(!email  || !password || !name) return
    dispatch(getUser({
      name,
      email,
      password
    }))
  }
  return (
    <div className="base-container register Login" ref={props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="Form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
  )
}

export default Register