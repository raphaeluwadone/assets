import React from 'react'
import Header from '../../containers/header/Header'
import Banner from '../../containers/banner/Banner'
import About from '../../containers/about/About'
import Features from '../../containers/features/Features'
import './landingPage.css';
import CTA from '../../containers/cta/CTA'
import Pricing from '../../containers/pricing/Pricing'
import Faqs from '../../containers/faq/Faqs'
import Footer from '../../containers/footer/Footer'

function LandingPage() {
  return (
    <>
      <div className='home__banner'>
        <Header />
        <Banner />
      </div>
      <About />
      <Features />
      <CTA />
      <Pricing />
      <Faqs />
      <Footer />
    </>
    
  )
}

export default LandingPage