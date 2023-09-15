import "../styles/main-header.css";
import {
  RiTwitterFill,
  RiFacebookFill,
  RiLinkedinFill,
  RiInstagramLine,
} from "react-icons/ri";
// import asset_simple from '../assets/img/asset_simple.png';
import asset_simple from "../../../assets/img/asset_simple.png";
import { Link } from "react-router-dom";

const scroll = (id: any) => {
  const section = document.querySelector(id);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Menu = () => (
  <>
    <p>
      <a href="#home" onClick={() => scroll("#home")} className="header__links">
        HOME
      </a>
    </p>
    <p>
      <a
        href="#about"
        onClick={() => scroll("#about")}
        className="header__links"
      >
        ABOUT
      </a>
    </p>
    <p>
      <a
        href="#features"
        onClick={() => scroll("#features")}
        className="header__links"
      >
        FEATURES
      </a>
    </p>
    <p>
      <a
        href="#pricing"
        onClick={() => scroll("#pricing")}
        className="header__links"
      >
        PRICING
      </a>
    </p>
    <p>
      <a
        href="#contact"
        onClick={() => scroll("#contact")}
        className="header__links"
      >
        CONTACT US
      </a>
    </p>
  </>
);

function MainHeader() {
  return (
    <div className="section__padding asset__header">
      <div className="social__links-container">
        <a href="https://www.twitter.com" className="twitter">
          <RiTwitterFill />
        </a>
        <a href="https://www.facebook.com" className="facebook">
          <RiFacebookFill />
        </a>
        <a href="https://www.linkedin.coom" className="linkedin">
          <RiLinkedinFill />
        </a>
        <a href="https://www.instagram.com" className="instagram">
          <RiInstagramLine />
        </a>
      </div>
      <div className="asset__navbar">
        <Link to="/">
          <img src={asset_simple} alt="Logo" style={{ fontSize: "10px" }} />
        </Link>
        <div className="asset__nav">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
