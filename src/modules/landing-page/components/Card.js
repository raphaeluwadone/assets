import React from 'react';
import '../styles/card.css';

function Card({ icon, title, description}) {
  return (
      <div className='feature__card'>
          <div className='feature__icon'>
              <i className='icon'>{icon}</i>
          </div>
          <h4><a>{title}</a></h4>
          <p>{description}</p>
      </div>
  )
}

export default Card