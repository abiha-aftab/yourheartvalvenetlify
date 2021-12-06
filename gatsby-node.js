exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      pages: allKontentItemPageTemplate(
        filter: { system: { language: { in: ["default", "eu"] } } }
      ) {
        nodes {
          system {
            id
            language
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
      system: { id: pageID, language },
      elements: {
        title: { value: title },
        slug: { value: slug },
      },
    } = page
    let category = page.elements.topics.value
    category = category.length > 0 ? category[0].name : ''
    const pageSlug = slug.replace(/^\/+|\/+$/g, '').toLowerCase()
    const categorySlug = category
      .replace(/\s+/g, '-')
      .replace(/^\/+|\/+$/g, '')
      .toLowerCase()
    const regionalPath = language !== 'default' ? `/${language}` : ''
    const path =
      categorySlug === pageSlug ||
      categorySlug === 'regional' ||
      categorySlug === ''
        ? `${regionalPath}/${pageSlug}`
        : `${regionalPath}/${categorySlug}/${pageSlug}`

    const item = {
      url: path,
      pageSlug: pageSlug,
      name: title,
      category: category,
      categorySlug: categorySlug,
    }
    console.log(path)
    createPage({
      path: path,
      component:
        language !== 'default'
          ? require.resolve(`./src/templates/page-template-regional.js`)
          : require.resolve(`./src/templates/page-template.js`),
      context: { languageCode: language, pageID, item },
    })

 
  })
}
