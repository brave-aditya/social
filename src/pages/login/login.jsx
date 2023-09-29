import './login.scss'
import { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/authContext.jsx'

export default function Login(){

    const {login} = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        username:"",
        password:""
    })
    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = e =>{
        setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleLogin =async (e) => {
        e.preventDefault();
       try{
         await login(inputs);
         navigate("/");
       }catch(err){
        setErr(err.response.data);
       } 
    }

    return(
    <div className='login'>
        <div className="card">
           <div className="left">
            <h1>Hello World.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ad facilis maiores, at totam minus quisquam nam! Repellendus labore ipsam amet itaque totam fugiat dolor, eveniet excepturi consectetur eius quos?</p>
            <span>Don't have an account?</span>
            <Link to="/register" >
            <button>Register</button>
            </Link>
            </div> 
           <div className="right">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='Username' name="username" onChange={handleChange}/>
                <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
                {err && err}
                <button onClick={handleLogin}>Login</button>
            </form>
           </div>
        </div>
    </div>
    )
}