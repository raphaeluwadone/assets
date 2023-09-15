import "../styles/card.css";

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="feature__card">
      <div className="feature__icon">
        {/* <i className='icon'>{icon}</i> */}
      </div>
      <h4>
        <a>{title}</a>
      </h4>
      <p>{description}</p>
    </div>
  );
}

export default Card;
