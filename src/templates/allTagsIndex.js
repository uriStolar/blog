import React from 'react'
import { Link } from 'gatsby'
import { Container, Header } from 'semantic-ui-react'
import SiteNavFooter from '../components/SiteNavFooter';

const AllTagsTemplate = ({ data, pageContext }) => {
  const { tags } = pageContext
  return (
    <Container textAlign='justified'>
      <Header as='h4'>Tags</Header>
      <ul>
        {tags.map((tag, idx) => {
          return (
            <li key={idx}>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          )
        })}
      </ul>
      <SiteNavFooter />
    </Container>
  )
}

export default AllTagsTemplate
