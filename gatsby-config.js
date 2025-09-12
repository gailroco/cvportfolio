/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/cvportfolio/",
  siteMetadata: {
    title: `Gailroco's portfolio`,
    siteUrl: `https://gailroco.github.io/cvportfolio/`
  },
  plugins: [
            {
              resolve: "gatsby-plugin-sass",
              options: {
                implementation: require("sass-embedded"),
                sassOptions: {
                  api: "modern-compiler",
                },
              },
            },
            "gatsby-plugin-image",
            "gatsby-transformer-sharp",
            "gatsby-plugin-sharp",
            "gatsby-plugin-sitemap",
            "gatsby-transformer-remark",
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      background_color: `#fff`,
      theme_color: `#02aab0`,
      display: `standalone`,
      "icon": "src/images/favicon.png"
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/src/images/`,
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": `${__dirname}/src/pages/`,
    },
    __key: "pages"
  }
]
};