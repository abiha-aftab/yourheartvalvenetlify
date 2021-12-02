export const prepareSidebarLinks = (data, languageCode) => {
  if(!data.length) return
  let sidebarLinks = []
  let links = []
  let baseURL = ''
  data.forEach(menu => {
    const { title: {value: name} } = menu.elements
    if(menu.elements.menu_items) {
      const item = menu.elements.menu_items.value[0]
      links = item.elements.links.value
      baseURL = languageCode ? languageCode : item.elements.slug.value
      sidebarLinks.push({
        name: name,
        url: ``,
      })
      sidebarLinks = prepareLinks(baseURL, links, sidebarLinks)
    } else {
      links = menu.elements.links.value
      baseURL = languageCode ? languageCode : menu.elements.slug.value
      sidebarLinks = prepareLinks(baseURL, links, sidebarLinks)
    }
  })

  return sidebarLinks
}
const prepareLinks = (baseURL, links, sidebarLinks) => {
  links.forEach(link => {
    const { title: {value: name} } = link.elements
    let slug = link.elements.url ? link.elements.url.value : link.elements.slug.value
    let url = slug ? slug.indexOf("https") !== -1 ? slug : baseURL === slug ? `/${slug}` : `/${baseURL}/${slug.replace(/^\/+|\/+$/g, '')}` : ""
    if(baseURL === slug) return
    sidebarLinks.push({
      name: name,
      url: url
    })
  })
  return sidebarLinks
}
