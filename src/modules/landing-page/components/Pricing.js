import React, { useEffect, useState } from 'react';
import { getPlanId } from '../../../services/authentication';
import Asset from './Asset';
import '../styles/pricing.css';

function Pricing() {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getPlanId()
      .then((res) => {
        console.log(res.data);
        setPlans(res.data)
      })
  },[])
  return (
    <div className='asset__pricing'>
        <div className="asset__pricing-text">
            <h3>Features</h3>
            <p>Be in absolute control of  your IT system using all this built-in asset management features.</p>
        </div>
        <div className="asset__pricing-type">
            <Asset key={1} price="4,999" plan="Basic" offers={["User Management", "One User", "Maximum of 150 Items", "24/7 Support System"]} />
            <Asset key={2} price="7,999" plan="Regular" offers={["User Management", "Maximum of 50 Users", "Maximum of 300 Items", "24/7 Support System"]} />
            <Asset key={3} price="11,999" plan="Premium" offers={["Api Integration", "User Management", "Unlimited Users", "Unlimited Items", "24/7 Support System"]} />
        </div>
    </div>
  )
}

export default Pricing