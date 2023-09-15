import "../styles/cta.css";

function CTA() {
  return (
    <div className="asset__cta">
      <div className="asset__cta-container">
        <div className="asset__cta-text">
          <h3>SIGN UP FOR A FREE 1 MONTH TRIAL</h3>
          <p>
            Let’s take you on an amazing ride on how you can manage all your
            assets efficiently and easily with no hassles. Ready for that
            awesome experience.
          </p>
        </div>
        <button className="asset__cta-button">
          <a href="#">Click Here</a>
        </button>
      </div>
    </div>
  );
}

export default CTA;
