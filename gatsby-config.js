require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('dotenv').config()
module.exports = {
  siteMetadata: {
    title: `YourHeartValve`,
    description: `The heart valve patient’s comprehensive resource for information from Edwards Lifesciences`,
    titleTemplate: `%s | YourHeartValve`,
    url: `https://yourheartvalve.com`,
    twitterUsername: `@EdwardsLifesci`,
    image: `/yhv-twitter.png`,
  },
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        projectId: process.env.GATSBY_PROJECT_ID, // if false used authorization key for secured API
        usePreviewUrl:
          process.env.KONTENT_PREVIEW_KEY_ENABLED &&
          process.env.KONTENT_PREVIEW_KEY_ENABLED.toLowerCase() === 'true',
        authorizationKey:
          process.env.KONTENT_PREVIEW_KEY_ENABLED &&
          process.env.KONTENT_PREVIEW_KEY_ENABLED.toLowerCase() === 'true'
            ? process.env.KONTENT_PREVIEW_KEY
            : undefined,
        languageCodenames: process.env.GATSBY_LANGUAGE_CODENAMES.split(',').map(
          (lang) => lang.trim()
        ),
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
