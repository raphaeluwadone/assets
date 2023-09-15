import React from 'react';
import '../styles/banner.css';
import {Link} from "react-router-dom";
import intro_img from '../../../assets/img/intro_img.svg';

function Banner() {
  return (
    <div className='asset__banner-section section__padding'>
        <div className='asset__banner-content'>
            <h1>Stay Systematic, <br />Secure And Smart</h1>
            <h5>View, Secure , control and manage your assets in one place.. Get your organisation ahead with <span><b>our game changing solution</b></span></h5>
            <div>
                <Link to="/pricing" className='btn__get-started'>Get Started</Link>
                <Link to="/login" className='btn__login'>Login</Link>
            </div>
        </div>
        <div className='asset__banner-image'>
            <img src={intro_img} alt="Banner-Image" />
        </div>
    </div>
  )
}

export default Banner