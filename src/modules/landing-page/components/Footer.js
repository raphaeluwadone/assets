import React from 'react';
import asset_simple from '../../../assets/img/asset_simple.png';
import '../styles/footer.css';
import { RiTwitterFill, RiFacebookFill, RiLinkedinFill, RiInstagramLine } from "react-icons/ri";

function Footer() {
  return (
    <div className='asset__footer'>
        <div className="asset__footer-contact_info">
            <div className="footer__content">
                <div className="footer__logo">
                    <img src={asset_simple} alt="" />
                </div>
                <div className="asset__footer-contact">
                    <h4>Contact Us</h4>
                    <p>137/139 Broad Street <br />Marina, Lagos State <br />Nigeria <br /><strong>Phone:</strong> +234 90 872 67 507 <br /><strong>Email:</strong> info@asset.bz</p>
                    <div className="footer__social-links">
                        <a href=""><RiTwitterFill /></a>
                        <a href=""><RiFacebookFill /></a>
                        <a href=""><RiInstagramLine /></a>
                        <a href=""><RiLinkedinFill /></a>
                    </div>
                </div>
                <div className="asset__footer-message">
                    <h4>Send us a message</h4>
                    <p>Want to integrate AIMS into your service center. We would love to have you onboard. Please provide your details below.</p>
                    <form action="">
                        <div className="form-group">
                            <input placeholder='Your Name' className='form-control' type="text" name="" id="" />
                        </div>
                        <div className="form-group">
                            <input placeholder='Your Email' className='form-control' type="text" name="" id="" />
                        </div>
                        <div className="form-group">
                            <input placeholder='Subject' className='form-control' type="text" name="" id="" />
                        </div>
                        <div className="form-group">
                            <textarea placeholder='Message' className='form-control' name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="text-center">
                            <button type='submit'>submit</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        <div className="asset__copyright">
            <div className="copyright">
                © Copyright <strong>Assets</strong>. All Rights Reserved
            </div>
        </div>
    </div>
  )
}

export default Footer