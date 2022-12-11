import React from 'react'
import { Link, graphql } from 'gatsby'
import SiteHeader from '../components/SiteHeader'
import './../sass/styles.scss'

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <SiteHeader className='is-size-1' />
      <section className='section has-text-centered'>
        <div className='container'>
          {edges.map(edge => {
            const { frontmatter } = edge.node
            return (
              <div key={frontmatter.path}>
                <div className='card'>
                  <div className='card-content'>
                    <Link to={frontmatter.path}>
                      <p className='title'>{frontmatter.title}</p>
                      <div className='card-image'>
                        <figure className='image'>
                          <img
                            className='allPostsImage'
                            src={frontmatter.image.childImageSharp.gatsbyImageData.images.sources[0].src}
                            srcSet={frontmatter.image.childImageSharp.gatsbyImageData.images.sources[0].srcSet}
                            alt={`Pic for ${frontmatter.title}`} />
                        </figure>
                      </div>
                      <br />
                    </Link>
                    <div className='subtitle'>
                      {frontmatter.excerpt}
                    </div>
                  </div>
                </div>
                <br />
              </div>
            )
          })}
        </div>
        <div className='navabar is-size-4'>
          <br />
          <Link to='/tags' className='blackText underline'>Buscar notas por etiquetas</Link>
        </div>
      </section>
    </div>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            path
            date
            image {
              childImageSharp {
                gatsbyImageData(width: 700, quality: 100)
              }
            }
          }
        }
      }
    }
  }
`

export default Layout
