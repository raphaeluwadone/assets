import Asset from "./Asset";
import "../styles/pricing.css";

function Pricing() {
  return (
    <div className="asset__pricing" id="pricing">
      <div className="asset__pricing-text">
        <h3>Pricing</h3>
        <p>
          There is a plan for you. Try Asset Management out or select one of our
          more paid plans to continue.
        </p>
      </div>
      <div className="asset__pricing-type">
        <Asset
          planId={1}
          price="4,999"
          plan="Basic"
          offers={[
            "User Management",
            "One User",
            "Maximum of 150 Items",
            "24/7 Support System",
          ]}
        />
        <Asset
          planId={2}
          price="7,999"
          plan="Regular"
          offers={[
            "User Management",
            "Maximum of 50 Users",
            "Maximum of 300 Items",
            "24/7 Support System",
          ]}
        />
        <Asset
          planId={3}
          price="11,999"
          plan="Premium"
          offers={[
            "Api Integration",
            "User Management",
            "Unlimited Users",
            "Unlimited Items",
            "24/7 Support System",
          ]}
        />
      </div>
    </div>
  );
}

export default Pricing;
