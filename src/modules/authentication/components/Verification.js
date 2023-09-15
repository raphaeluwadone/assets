import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/verification.css';

function Verification() {
  return (
    <div className='main__container'>
        <div className='container'>
            <h3>Verification Email Sent</h3>
            <hr />
            <p>An email has been sent to verify that you indeed initiated this password change.Please click on the link in the email to continue.</p>
            <div className='footer__links'>
                <Link to='/login'><p>Login</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Verification