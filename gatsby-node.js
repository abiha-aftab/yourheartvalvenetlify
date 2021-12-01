exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      pages: allKontentItemPageTemplate {
        nodes {
          system {
            id
          }
          elements {
            title {
              value
            }
            slug {
              value
            }
            topics {
              value {
                name
              }
            }
          }
        }
      }
    }
  `)

  data.pages.nodes.forEach((page) => {
    const {
      system: { id: pageID },
      elements: {
        title: { value: title },
        slug: { value: pageSlug },
        topics: {
          value: [{ name: category }],
        },
      },
    } = page
    const categorySlug = category.replace(/\s+/g, '-').toLowerCase()
    const path =
      categorySlug === pageSlug
        ? `/${pageSlug}`
        : `/${categorySlug}/${pageSlug}`
    const item = {
      url: path,
      pageSlug: pageSlug,
      name: title,
      category: category,
      categorySlug: categorySlug,
    }
    createPage({
      path: path,
      component: require.resolve(`./src/templates/page-template.js`),
      context: { pageID, item },
    })

    if (1) {
      createPage({
        path: `/preview/${pageSlug}`, // preview URL https://<domain>/preview/page/{Lang}/{Codename}
        component: require.resolve(`./src/templates/page-template.js`),
        context: { pageID, item },
      })
    }
  })
}
