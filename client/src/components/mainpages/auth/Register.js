import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Register() {
    const [user,setUser] = useState({
        name:'',email:'',password:''
    })
    const onChangeInpute = (e)=>{
        const {name,value}= e.target;
        setUser({...user,[name]:value})
    }
    const registerSubmit = async(e)=>{
        e.preventDefault()
        try{
            await axios.post('/user/register',{...user})
            localStorage.setItem('firstlogin',true)
            window.location.href = "/";
        }
        catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <input type="name" name="name" required placeholder="Name" value={user.name} onChange={onChangeInpute}/>
          
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInpute}/>
                <input type="password" name="password" required placeholder="Password" autoComplete="on" value={user.password} onChange={onChangeInpute}/>
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>

                </div>
            </form>
        </div>
    )
}

export default Register
