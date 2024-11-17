import { useState } from 'react';
import './register.scss'
import {Link} from "react-router-dom";
import axios from "axios";

export default function Register(){

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:""
    })
    const [err, setErr] = useState(null);

    const handleChange = e =>{
        setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault();

        try{
           await axios.post("https://social-server-evtu.onrender.com/api/auth/register", inputs)

        }catch(err){
         setErr(err.response.data);
        }
    }


    return(
    <div className='register'>
        <div className="card">
           <div className="left">
           <h1>Register</h1>
           <Link to="/login" >
           <h2>Tap here if you want to login</h2>
           </Link>

            <form>
                <input type="text" placeholder='Name' name="name" onChange={handleChange}/>
                <input type="text" placeholder='Username' name="username" onChange={handleChange}/>
                <input type="email" placeholder='Email' name="email" onChange={handleChange}/>
                <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
                {err && err}
                <button onClick={handleSubmit}>Register</button>
            </form>
            </div> 
           <div className="right">
           <h1>Welcome to Social.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ad facilis maiores, at totam minus quisquam nam! Repellendus labore ipsam amet itaque totam fugiat dolor, eveniet excepturi consectetur eius quos?</p>
            <span>Do you have an account?</span>
            <Link to="/login" >
            <button>Login</button>
            </Link>
           </div>
        </div>
    </div>
    )
}

