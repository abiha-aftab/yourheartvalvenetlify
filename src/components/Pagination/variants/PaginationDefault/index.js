import React from 'react'
import { Link } from 'gatsby'
import { FaAngleDoubleRight } from 'react-icons/fa'

const PaginationDefault = ({ path }) => {
  let links = []
  let incrementalPath = ''
  links.push({ text: 'Home', url: '/' })
  path = path.split('/')
  path.forEach((item) => {
    incrementalPath = `${incrementalPath}/${item}`
    links.push({
      text: item.replace(/-/g, ' ').replace('faqs', 'FAQs'),
      url: incrementalPath,
    })
  })

  return (
    <ul className="paginationDefault">
      {links.map((link, index) => {
        const { text, url } = link
        const counter = index + 1
        if (counter !== links.length) {
          return (
            <li className="paginationDefault__item" key={index}>
              <Link to={url} className="paginationDefault__link">
                {text}
              </Link>
              <FaAngleDoubleRight className="paginationDefault__icon" />
            </li>
          )
        } else {
          return (
            <li className="paginationDefault__item" key={index}>
              <Link to={url} className="paginationDefault__link">
                {text}
              </Link>
            </li>
          )
        }
      })}
    </ul>
  )
}

export default PaginationDefault
