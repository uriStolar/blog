import React from 'react'
import { Link, graphql } from 'gatsby'
import { Container, Divider, Header } from 'semantic-ui-react'
import SiteHeader from '../components/SiteHeader'
import './../styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Container text textAlign='center'>
      <br />
      <SiteHeader />
      <Divider horizontal>
        <Header as='h4'>
          <FontAwesomeIcon icon={faStickyNote} size='lg' />
          &nbsp;Notes
        </Header>
      </Divider>
      {edges.map(edge => {
        const { frontmatter } = edge.node
        return (
          <div key={frontmatter.path}>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
          </div>
        )
      })}
      <br />
      <Link to='/tags'>Browse notes by tags</Link>
    </Container>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`

export default Layout
