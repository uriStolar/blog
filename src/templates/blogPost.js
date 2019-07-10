import React from 'react'
import { graphql } from 'gatsby'
import { Container, Header, Segment } from 'semantic-ui-react'
import SiteNavFooter from '../components/SiteNavFooter'
import 'semantic-ui-css/semantic.min.css'
import 'github-markdown-css'

const Template = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { next, prev } = pageContext
  const { title, excerpt, date } = markdownRemark.frontmatter
  const { html } = markdownRemark

  return (
    <Container text textAlign='justified'>
      <br />
      <Header as='h1'>{title}</Header>
      <Segment basic>
        <p>Publicado el {date}</p>
        <p>{excerpt}</p>
      </Segment>
      <div
        className='blogpost markdown-body'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <SiteNavFooter prev={prev} next={next} />
    </Container>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        excerpt
        date(formatString: "LL", locale: "es-MX")
      }
    }
  }
`

export default Template
