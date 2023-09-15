import { Link } from "react-router-dom";
import "../styles/asset.css";

function Asset({
  planId,
  price,
  plan,
  offers,
}: {
  planId: number;
  price: string;
  plan: string;
  offers: string[];
}) {

  return (
    <div className="pricing__card">
      <div className="pricing__card-header">
        <h3>
          <span className="currency">₦{price}</span>
          <span className="period">/month</span>
        </h3>
      </div>
      <div className="pricing__card-block">
        <h4>{plan}</h4>
        <div className="pricing__availaible-text">
          {offers.map((text: string) => {
            return <p>{text}</p>;
          })}
        </div>
        <Link to={`/register/${planId}`}>
          <button>Choose Plan</button>
        </Link>
      </div>
    </div>
  );
}

export default Asset;
