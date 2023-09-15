import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../services/authentication';

import '../styles/reset.css';

function ForgetPassword() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({Email: ""})

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDetails({...details,
            [name]: value
        });
        console.log(details);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);
        resetPassword(details)
            .then((res) => {
                if(res.data != "There is no user with this email on our system" && res.status == 200){
                    navigate('/email-notify');
                }
            })
            .catch((error) => console.error("Error:", error));
    }
  return (
    <div className='main__container'>
        <div className='container'>
            <h3>Recover Password</h3>
            <hr />
            <div className='input__section'>
                <form onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <input className='form__control' type="text" placeholder='E-Mail Address' name="Email" onChange={handleOnChange} value={details.Email} />
                    </div>
                    <div className='form__group'>
                        <button className='form__button'>Reset Password</button>
                    </div>
                </form>
                <div className='footer__links'>
                    <Link to='/login'><p>Login Instead?</p></Link>
                    <Link to='/register'><p>Create an account</p></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword