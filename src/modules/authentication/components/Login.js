import React, { useState } from 'react'
import '../styles/login.css';
import {Link, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from '../../../services/authentication';
import MainHeader from '../../../components/MainHeader';
import Error from '../../../components/Error';

function Login() {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        Email: "",
        Password: ""
    })

    const [isError, setIsError] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({...loginDetails,
            [name]: value
        });
        console.log(loginDetails);
    }

    const LogMeIn = (userobj) => {
        localStorage.clear();
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginDetails);
        login(loginDetails)
            .then((res) => {
                if(res.status == 200){
                    console.log(res.data.Id);
                    localStorage.setItem("userId", JSON.stringify(res.data.Id));
                    localStorage.setItem("portalId", JSON.stringify(res.data.PortalId));
                    navigate('/home');
                }else if (res.status >= 400){
                    setIsError(true);
                }

            })
            .catch((error) => console.error("Error:", error));
    }
  return (
    <div>
        {/* <MainHeader /> */}
        <div className='auth'>
            <div className='auth__section'>
                <h3>Login</h3>
                <hr />
                {isError && <Error text="Invalid Username or Password" />}
                <div className='input__section'>
                    <form onSubmit={handleSubmit}>
                        <div className='form__group'>
                            <input className='form__control' type="text" placeholder='E-Mail Address' name="Email" value={loginDetails.Email} onChange={handleOnChange} />
                        </div>
                        <div className='form__group'>
                            <input className='form__control' type="password" placeholder='Password' name="Password" value={loginDetails.Password} onChange={handleOnChange} />
                        </div>
                        <div className='form__group'>
                            <button className='form__button'>Login</button>
                        </div>
                    </form>
                    <div className='form__group-terms'>
                        <div className='save__user'>
                            <input type="checkbox" /> 
                            <p>Remember me</p>
                        </div>
                        <Link to='/reset-password'><p className='forget__password'>Forgot Password</p></Link>
                    </div>
                    <p className='login__link'><Link to='/register'>Create an account</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login