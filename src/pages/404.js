import React from 'react'
import HeroSmall from "../containers/Hero/variants/HeroSmall"
import { Link } from 'gatsby'

const NotFound = () => {
  return (
    <>
    <HeroSmall/>
    <div className="section container">
      <h2>We're sorry. The page you're looking for can't be found.</h2>
        <p>Can we help you find something? We have some suggestions below:</p>
        <ul className="list list--unstyled">
          <li className="list__item">
              <Link to="/" className="list__link">Home</Link>
          </li>
          <li className="list__item">
              <Link to="/" className="list__link">Site Map</Link>
          </li>
          <li className="list__item">
              <Link to="/" className="list__link">Contact us</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NotFound
