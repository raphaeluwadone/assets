import { useState } from "react";
import "../styles/question.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Question({ title, info }: { title: string; info: string }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="asset__questions">
      <div className="asset__question">
        <p>{title}</p>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus color={"#ff0000"} />}
        </button>
      </div>
      <div className="asset__answer">
        <p>{showInfo && info}</p>
      </div>
    </div>
  );
}

export default Question;
