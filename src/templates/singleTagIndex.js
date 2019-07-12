import React from 'react'
import { Link } from 'gatsby'
import SiteNavFooter from '../components/SiteNavFooter'

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <section className='section'>
      <div className='container'>
        <p className='title'>Notas acerca de {tagName}</p>
        <ul>
          {posts.map((post, idx) => {
            return (
              <li key={idx} className='subtitle'>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <br />
      <SiteNavFooter className='section' />
    </section>
  )
}

export default SingleTagTemplate
