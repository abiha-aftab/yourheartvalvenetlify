import React from 'react'
import { graphql } from 'gatsby'
import HeroSmall from '../containers/Hero/variants/HeroSmall'
import SidebarDefault from '../components/Sidebar/variants/SidebarDefault'
import PaginationDefault from '../components/Pagination/variants/PaginationDefault'
import ContentsPageTemplate from '../containers/Contents/variants/ContentsPageTemplate'
import { prepareSidebarLinks } from '../utils/prepareSidebarLinks'
import Dropdown from '../components/Dropdown/variants/DropdownDefault'
import SEO from '../components/SEO'
import Layout from '../components/Layout/variations/LayoutDefault'

export default function PageTemplate({ pageContext: { pageID, item }, data }) {
  const path = item.url.replace(/^\/+|\/+$/g, '')
  const {
    body,
    image,
    aside_menu: { value: menu },
    accordions: { value: accordions },
    modal: { value: modal },
    marketo_form: { value: marketo_form },
    dropdown: { value: dropdown },
    title: { value: title },
  } = data.page.elements
  const { id, codename } = data.page.system
  const sidebarLinks = prepareSidebarLinks(menu)

  console.log('page ID is: ', pageID)
  return (
    <Layout>
      <SEO title={title} />
      <HeroSmall image={image.value ? image.value[0] : null} />
      <section className="section">
        <div className="container">
          <h2
            className="text-crimson"
            data-kontent-item-id={id}
            data-kontent-element-codename={codename}
          >
            {item.category}
          </h2>
          <PaginationDefault path={path} />
          <div className="grid-1 grid-md-12 mt-2 gap-1 gap-md-2">
            {sidebarLinks && (
              <div className="col-md-4">
                <SidebarDefault sidebarLinks={sidebarLinks} />
              </div>
            )}
            <div className={sidebarLinks ? 'col-md-8' : 'col-md-12'}>
              <ContentsPageTemplate
                path={path}
                body={body}
                accordions={accordions}
                modal={modal}
                marketo_form={marketo_form}
                itemId={id}
                itemCodename={codename}
              />
              {dropdown.length > 0 && (
                <Dropdown
                  dropdown={dropdown[0]}
                  categorySlug={item.categorySlug}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($pageID: String) {
    page: kontentItemPageTemplate(system: { id: { eq: $pageID } }) {
      system {
        id
        codename
      }
      elements {
        title {
          value
        }
        image {
          value {
            ...image
          }
        }
        aside_menu {
          value {
            ...menu_group
            ...nav_menu
          }
        }
        body {
          value
          images {
            url
            description
            height
            width
          }
          links {
            link_id
            url_slug
          }
          modular_content {
            id
          }
        }
        accordions {
          value {
            ...accordions
          }
        }
        modal {
          value {
            ...modal
          }
        }
        marketo_form {
          value {
            ...marketo_form
          }
        }
        dropdown {
          value {
            ...dropdown
          }
        }
      }
    }
  }
`
