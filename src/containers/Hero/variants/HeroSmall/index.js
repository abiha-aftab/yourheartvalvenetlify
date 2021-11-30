import React from 'react'
import { ImageElement } from '@kentico/gatsby-kontent-components'
import { StaticImage } from 'gatsby-plugin-image'

const HeroSmall = ({ image }, itemId, itemCodename) => {
  let hero = ''
  if (image) {
    const {
      alt: { value: image_alt },
      asset: {
        value: [image_asset],
      },
    } = image.elements
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
    <section
      data-kontent-item-id={itemId}
      data-kontent-element-codename={itemCodename}
    >
      {hero}
    </section>
  )
}

export default HeroSmall
