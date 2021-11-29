require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('dotenv').config()
module.exports = {
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        projectId: process.env.KONTENT_PROJECT_ID,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(
          ','
        ).map((lang) => lang.trim()),
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
