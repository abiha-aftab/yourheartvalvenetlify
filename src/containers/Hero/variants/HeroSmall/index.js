import React from 'react'
import { ImageElement } from '@kentico/gatsby-kontent-components'
import { StaticImage } from 'gatsby-plugin-image'

const HeroSmall = ({ image }) => {
  let hero = ''
  if (image) {
    const {
      alt: { value: image_alt },
      asset: {
        value: [image_asset],
      },
    } = image.elements
    const { id, codename } = image.system
    hero = (
      <ImageElement
        image={image_asset}
        className="heroSmall"
        alt={image_alt || 'hero image'}
      />
    )
  } else {
    hero = (
      <StaticImage
        className="heroSmall"
        src="../../../../assets/images/page-banner.jpeg"
        alt="hero image"
      />
    )
  }
  return (
    <section data-kontent-item-id={id} data-kontent-element-codename={codename}>
      {hero}
    </section>
  )
}

export default HeroSmall
