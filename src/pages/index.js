import React from 'react'
import HeroLarge from '../containers/Hero/variants/HeroLarge'
import FeaturesDefault from '../containers/Features/variants/FeaturesDefault'
import ContentsDefault from '../containers/Contents/variants/ContentsDefault'
import { graphql } from 'gatsby'

export default function Home({ data }) {
  const {
    home: { elements: sections },
  } = data
  const {
    page_banner: {
      value: [pageBanner],
    },
    patient_information: {
      value: [patientInformation],
    },
    heart_anatomy: {
      value: [heartAnatomy],
    },
  } = sections
  return (
    <>
      <HeroLarge data={pageBanner} />
      <FeaturesDefault data={patientInformation} />
      <ContentsDefault data={heartAnatomy} />
    </>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    home: kontentItemHomeTemplate {
      system {
        id
        codename
      }
      elements {
        title {
          value
        }
        slug {
          value
        }
        page_banner {
          value {
            ...section
          }
        }
        patient_information {
          value {
            ...section
          }
        }
        heart_anatomy {
          value {
            ...section
          }
        }
      }
    }
  }
`
