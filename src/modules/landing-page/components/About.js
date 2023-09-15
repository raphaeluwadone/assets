import React from 'react';
import '../styles/about.css';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import about_img from '../../../assets/img/about_img.jpg';

function About() {
  return (
    <div className='asset__about section__padding'>
        <div className='about__img'>
            <img src={about_img} alt='About Image' />
        </div>
        <div className='about__content'>
            <h2>About Asset</h2>
            <h3>Asset and Inventory Management System.</h3>
            <p>AIMS enables organisations makes it painless to closely monitor and maintain tangible and intangible assets with the provision of an entrenched friendly Asset Management Portal in a holistic system.</p>
            <p>With AIMS, the systematic process of deploying, operating, maintaining, and disposing of assets becomes very cost-effective. All of these are simplified with our easy to use simple interface that makes you access information quickly and easily knowing what you have and who has it with the use of ultra  high frequency tags.</p>
            <p>Our applications are built to a “Best Practices” standard, but on an architecture that can be customized quickly and affordably. You can incorporate your policies, procedures and unique data elements right into the software.</p>
            <ul className='about__points'>
                <li><i className='icon'><IoMdCheckmarkCircleOutline /></i>Standard and robust, yet customizable.</li>
                <li><i className='icon'><IoMdCheckmarkCircleOutline /></i>Real time  tracking of all asset stock and consumable items</li>
                <li><i className='icon'><IoMdCheckmarkCircleOutline /></i>Ensures end-to-end asset lifecycle management from origin to obsolescence. Add and track asset purchase orders, vendors, maintenance histories, and lifetime costs.</li>
            </ul>
        </div>
    </div>
  )
}

export default About