import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import '../styles/signup.css';
import { signup } from '../../../services/authentication';

function Signup() {
    const [signInDetails, setSignInDetails] = useState({
        CompanyName: "",
        Email: "",
        FirstName: "",
        Password: "",
        planId: 0
    })

    const handleOnChange = (e) => {
        const { name, value, type } = e.target;
        if(type === 'checkbox'){
            value = e.target.checked
        }
        setSignInDetails({...signInDetails,
            [name]: value
        });
        console.log(signInDetails);
    }

    const register = (payload) => {
        signup(payload)
            .then((res) => {
                console.log(res.data);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signInDetails);
        register(signInDetails);
    }

  return (
    <div>
        {/* <MainHeader /> */}
        <div className='auth'>
            <div className='auth__section'>
                <h3>Sign Up</h3>
                <hr />
                <div className='input__section'>
                    <form onSubmit={handleSubmit}>
                        <div className='form__group'>
                            <input className='form__control' type="text" placeholder='Organization Name' name="CompanyName" onChange={handleOnChange} value={signInDetails.CompanyName} />
                        </div>
                        <div className='form__group'>
                            <input className='form__control' type="text" placeholder='E-Mail Address' name="Email" onChange={handleOnChange} value={signInDetails.Email} />
                        </div>
                        <div className='form__group'>
                            <input className='form__control' type="text" placeholder='FullName' name="FirstName" onChange={handleOnChange} value={signInDetails.FirstName} />
                        </div>
                        <div className='form__group'>
                            <input className='form__control' type="password" placeholder='Password' name="Password" onChange={handleOnChange} value={signInDetails.Password} />
                        </div>
                        <div className='form__group'>
                            <input className='form__control' type="number" placeholder='PlanId' name="PlanId" onChange={handleOnChange} value={signInDetails.PlanId} />
                        </div>
                        <div className='form__group-terms'>
                            <input name="" type="checkbox" required /> 
                            <p>By clicking the Sign Up button, you agree to our terms and conditions.</p>
                        </div>
                        <div className='form__group'>
                            <button className='form__button'>Sign Up</button>
                        </div>
                    </form>
                    <Link to='/login'><p className='login__link'>Already have an account? Log in</p></Link>
                </div>
            </div>
        </div>
        {/* <div className="asset__login">
            <div className="asset__login-header">
                <h3>Sign Up</h3>
            </div>
            <hr />
            <div className="login_section">
                <form action="">
                <div className="form-group">
                        <input placeholder='FullName' className='form-control' type="text" name="" id="" />
                    </div>
                    <div className="form-group">
                        <input placeholder='E-mail Address' className='form-control' type="text" name="" id="" />
                    </div>
                    <div className="form-group">
                        <input placeholder='Organization Name' className='form-control' type="text" name="" id="" />
                    </div>
                    <div className="form-group">
                        <input placeholder='Password' className='form-control' type="text" name="" id="" />
                    </div>
                    <div className="form-group">
                        <Link to="/home"><button className='btn'>Login</button></Link>
                    </div>
                    
                </form>
            </div>
            <div className="detail__recovery">
                <div className="register">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="Remember Me"><span>Remember Me</span></label>
                </div>
                <div className="forget__password">
                    <a href="">Forgot Password?</a>
                </div>
            </div>
            <p><a href="#">Create an account</a></p>
        </div> */}
    </div>
  )
}

export default Signup