export const prepareDataLinks = (data) => {
  let navLinks = []
  data.forEach(link => {
    const { title: {value: title}, slug } = link.elements
    let baseURL = slug.value ? slug.value : ""
    let links = link.elements.links ? link.elements.links.value : []
    navLinks.push({
      name: title,
      url: baseURL === "/" ? baseURL : `/${baseURL}`,
      links: links.length ? extractChillLinks(links, baseURL) : []
    })
  })
  return navLinks
}
const extractChillLinks = (data, baseURL) => {
  let childLinks = []
  data.forEach(link => {
    const { title: {value: title} } = link.elements
    let slug = link.elements.url ? link.elements.url.value : link.elements.slug.value
    let url = slug ? slug.indexOf("https") !== -1 ? slug : baseURL === slug ? `/${slug}` : `/${baseURL}/${slug}` : ""
    childLinks.push({
      name: title,
      url: url
    })
  })
  return childLinks
}
