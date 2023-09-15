import MainHeader from "../../components/landingPage/components/MainHeader";
import Banner from "../../components/landingPage/components/Banner";
import About from "../../components/landingPage/components/About";
import Features from "../../components/landingPage/components/Features";
import CTA from "../../components/landingPage/components/CTA";
import Pricing from "../../components/landingPage/components/Pricing";
import Faqs from "../../components/landingPage/components/Faqs";
import Footer from "../../components/landingPage/components/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="home__banner">
        <MainHeader />
        <Banner />
      </div>
      <About />
      <Features />
      <CTA />
      <Pricing />
      <Faqs />
      <Footer />
    </>
  );
};

export default LandingPage;
