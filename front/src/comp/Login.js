import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import Cookies from 'js-cookie'

function Login() {
    let [data,udata] = useState({"_id":"","pwd":""})
    let [msg,umsg] = useState("")
    let navigate = useNavigate()
    let obj = useContext(Ct)
    let fun=(e)=>{
        udata({...data,[e.target.name]:e.target.value})
    }

    let log=()=>{
        if(data._id !=="" && data.pwd !==""){
            axios.post("http://localhost:5000/login",data).then((res)=>{
                if(res.data.token !== undefined){
                    obj.updstate(res.data)
                    Cookies.set('auth', JSON.stringify(res.data), { expires: 1 })
                    umsg("Login Successfully")
                    setTimeout(() => navigate('/'), 1000)
                }else{
                    umsg(res.data.msg)
                }
            })
        }else{
            umsg("please fill the details")
        }
    }

    let reg=()=>{
        navigate("/reg")
    }


  return (
    <div className='form'>
      <div className='form-con'>
        <div className='form-lft'>
          <h1>Welcome</h1>
          <p>New here? Create an account to join us.</p>
          <button className='btn' onClick={reg}>Register</button>
        </div>

        <div className='form-rgt'>
          <h1>Login Here</h1>
          <h4 className='msg'>{msg}</h4>
          <div className='input'>
            <input type='text' placeholder='Email' name='_id' onChange={fun} value={data._id}/>
            <input type='text' placeholder='Password' name='pwd' onChange={fun} value={data.pwd}/>
          </div>
          <button className='btn' onClick={log}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login