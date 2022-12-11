import React from 'react'
import { Link } from 'gatsby'
import SiteNavFooter from '../components/SiteNavFooter'

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <section className='section allTags'>
      <div className='container content'>
        <p className='title'>Notas sobre "{tagName}"</p>
        <ul>
          {posts.map((post, idx) => {
            return (
              <li key={idx} className='subtitle blackText listNoStyle'>
                <span>👉🏼 </span>
                <Link to={post.frontmatter.path} className='blackText underline'>{post.frontmatter.title}</Link>
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
