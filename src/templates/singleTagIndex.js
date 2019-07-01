import React from 'react'
import { Link } from 'gatsby'
import { Container, Header } from 'semantic-ui-react'
import SiteNavFooter from '../components/SiteNavFooter'
import 'semantic-ui-css/semantic.min.css'

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext

  return (<Container textAlign='justified'>
    <Header as='h4'>
        Posts about {tagName}
    </Header>
    <div>
      <ul>
        {posts.map((post, idx) => {
          return (
            <li key={idx}>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </li>
          )
        })}
      </ul>
      <SiteNavFooter />
    </div>
  </Container>
  )
}

export default SingleTagTemplate
