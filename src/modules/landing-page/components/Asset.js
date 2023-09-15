import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/asset.css';

function Asset({ key, price, plan, offers }) {
    const [texts] = useState(["User Management", "One User", "Maximum of 150 Items"])
  return (
    <div className='pricing__card'>
        <div className="pricing__card-header">
            <h3><span className='currency'>₦{price}</span><span className='period'>/month</span></h3>
        </div>
        <div className="pricing__card-block">
            <h4>{plan}</h4>
            <div className="pricing__availaible-text">
                {offers.map((text) => {
                    return(
                        <p>{text}</p>
                    )
                })}
            </div>
            <Link to="/register" state={{ id: key}}><button>Choose Plan</button></Link>
        </div>
    </div>
  )
}

export default Asset