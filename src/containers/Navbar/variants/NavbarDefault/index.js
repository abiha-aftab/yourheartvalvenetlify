import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Nav from './Nav'
import { Link } from 'gatsby'

const NavbarDefault = ({ navLogo, navLinks = null }) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobile, setMobile] = useState(false)
  const toggleMobile = () => {
    setMobile(!mobile)
  }
  const {
    value: [image],
  } = navLogo
  const {
    alt: { value: image_alt },
    asset: {
      value: [image_asset],
    },
  } = image.elements
  return (
    <nav className="navbarDefault" role="navigation">
      <div className="navbarDefault__container">
        <div className="navbarDefault__top">
          <Link to="/">
            <img
              src={image_asset.url}
              className="navbarDefault__logo"
              alt={image_alt || 'YourHeartvalve logo'}
            />
          </Link>
          <button
            className="navbarDefault__toggle"
            onClick={toggleMobile}
            aria-expanded={mobile ? 'true' : 'false'}
          >
            <FiMenu />
          </button>
        </div>
        <Nav
          navLinks={navLinks}
          mobile={mobile}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
      </div>
    </nav>
  )
}

export default NavbarDefault
