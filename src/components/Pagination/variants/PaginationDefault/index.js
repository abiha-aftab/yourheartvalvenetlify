import React from 'react'
import { Link } from 'gatsby'
import { FaAngleDoubleRight } from 'react-icons/fa'

const PaginationDefault = ({
  path,
  languageCode = null,
  pageId,
  pageCodename,
}) => {
  let links = []
  let incrementalPath = languageCode ? `/${languageCode}` : ''
  links.push({ text: 'Home', url: languageCode ? `/${languageCode}` : '/' })
  path = path.split('/')
  path.forEach((item) => {
    if (languageCode && item === languageCode) return
    incrementalPath = `${incrementalPath}/${item}`
    links.push({
      text: item.replace(/-/g, ' ').replace('faqs', 'FAQs'),
      url: incrementalPath,
    })
  })

  return (
    <ul className="paginationDefault" data-kontent-item-id={pageId}>
      {links.length > 1 &&
        links.map((link, index) => {
          const { text, url } = link
          const counter = index + 1
          if (counter !== links.length) {
            console.log('if', text)
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
              <li
                className="paginationDefault__item"
                key={index}
                data-kontent-element-codename={pageCodename}
              >
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
