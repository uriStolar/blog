import React from 'react'
import { Link, graphql } from 'gatsby'
import SiteHeader from '../components/SiteHeader'
import './../sass/styles.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <section className='section has-text-centered'>
      <div className='container is-desktop'>
        <SiteHeader className='is-size-1' />
        {edges.map(edge => {
          const { frontmatter } = edge.node
          return (
            <div key={frontmatter.path} className='card'>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img src='https://bulma.io/images/placeholders/640x480.png' alt='Placeholder' />
                </figure>
              </div>
              <div className='card-content'>
                <Link to={frontmatter.path}>
                  <p className='title'>{frontmatter.title}</p>
                </Link>
                <div className='subtitle'>
                  {frontmatter.excerpt}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='navabar is-size-4'>
        <br />
        <Link to='/tags'>Buscar notas por sus tags</Link>
      </div>
    </section>
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
          }
        }
      }
    }
  }
`

export default Layout
