import React, { useEffect, useState } from 'react'
import '../../../../assets/scss/main.scss'
import { prepareDataLinks } from '../../../../utils/prepareDataLinks'
import NavbarRegional from '../../../../containers/Navbar/variants/NavbarRegional'
import FooterRegional from '../../../../containers/Footer/variants/FooterRegional'

const LayoutRegional = ({ children, languageCode, header, footer }) => {

  const [languages, setLanguages] = useState([])

  useEffect(() => {
    if(!languages.length) {
      fetch(`${process.env.GATSBY_DELIVERY_API_URL}${process.env.GATSBY_KONTENT_PROJECT_ID}/languages`)
        .then(response => response.json())
        .then(results => {
          const tmp = []
          results.languages?.forEach(language => {
            const {codename, name} = language.system
            if(codename !== 'default')
              tmp.push({name: name, url: `/${codename}`})
          })
          setLanguages(tmp)
        })
    }
  }, [])

  const navLogo = header.elements.logo
  const navLinks = prepareDataLinks(header.elements.menu.value, languageCode, "header")
  const languageSelectorText = header.elements.language_selector?.value
  const footerLinks = prepareDataLinks(footer.elements.menu.value, languageCode, "footer")
  const footerText = footer.elements.text.value

  return (
    <div className="layout">
      <NavbarRegional
        navLogo={navLogo}
        navLinks={navLinks}
        languages={languages}
        languageSelectorText={languageSelectorText}
      />
      {children}
      <FooterRegional footerLinks={footerLinks} footerText={footerText} />
    </div>
  )
}

export default LayoutRegional
