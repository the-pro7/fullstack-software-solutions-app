import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import heroImage from '../assets/icons/hero.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import ServiceCircle from './ServiceCircle'

// Service cirlce images
import figmaImage from '../assets/icons/figma.png'
import htmlFiveImage from '../assets/icons/html5.png'
import flutterImage from '../assets/icons/flutter.png'
import cssThreeImage from '../assets/icons/css3.png'

export default function LandingPage () {
  let user = JSON.parse(localStorage.getItem('user'))
  let userToken = localStorage.getItem('token')
  const [show, setShow] = useState(false)

  function handleGetStarted (e) {
    e.preventDefault()
    if (!(user && userToken)) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <div className='wrapper'>
      <Navbar />
      <section className='hero-section'>
        <div className='hero-section__content'>
          <h1 className='section-header header'>
            Welcome to Salvatore Brothers Software Solutions.
          </h1>
          <p className='section-description margin-top'>
            In a world driven by technology and innovation, there's a rising
            star on the horizon. Welcome to Salvatore Brothers Software
            Solutions, where innovation meets solution.
          </p>
          <div className='section-ctas'>
            <Link to='' className='section-cta-main' onClick={handleGetStarted}>
              Get Started
            </Link>
            <Link to='' className='section-cta-secondary learn'>
              Learn More
              <FontAwesomeIcon icon={faCaretRight} />
            </Link>
          </div>
          {/* Optional rendering of reigster prompt */}
          {show && (
            <div className='register-prompt'>
              <h4>You need to have an account to continue</h4>
              <p>Please create a free account to get started</p>
              <div className='register-prompt__ctas'>
                <Link to='/signup' className='create'>
                  Create one
                </Link>
                <button onClick={() => setShow(false)} className='cancel'>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='hero-section__image'>
          <img src={heroImage} alt='Main hero image' />
          <ServiceCircle imageSrc={figmaImage} altText={'Figma Icon'} />

          <ServiceCircle
            imageSrc={htmlFiveImage}
            altText={'HTML 5 Icon'}
            style={{ position: 'absolute', top: '-5rem', left: '-1rem' }}
          />
          <ServiceCircle
            imageSrc={cssThreeImage}
            altText={'CSS 3 Icon'}
            style={{ position: 'absolute', top: '8rem', left: '20rem' }}
          />
          <ServiceCircle
            imageSrc={flutterImage}
            altText={'Flutter Icon'}
            style={{ position: 'absolute', top: '25rem', left: '20rem' }}
          />
        </div>
      </section>
    </div>
  )
}
