import React, { useState } from 'react';
import '../styles/question.css';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Question({ title, info }) {
    const [showInfo, setShowInfo] = useState(false);
  return (
    <div className='asset__questions'>
        <div className="asset__question">
            <p>{title}</p>
            <button onClick={()=> setShowInfo(!showInfo)}>{showInfo ? <AiOutlineMinus /> : <AiOutlinePlus /> }</button>
        </div>
        <div className="asset__answer">
            <p>{showInfo && info }</p>
        </div>
    </div>
  )
}

export default Question