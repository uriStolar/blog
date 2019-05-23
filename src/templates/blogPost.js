import React from "react"
import { graphql } from "gatsby"
import { Container, Divider, Header, Segment, Icon } from "semantic-ui-react"
import SiteNavFooter from "../components/SiteNavFooter"

const Template = ({data, pageContext}) => {
  const {markdownRemark} = data
  const {next, prev} = pageContext
  const {title, excerpt} = markdownRemark.frontmatter
  const {html} = markdownRemark

  return (
    <Container textAlign="justified">
      <Header as="h1">{title}</Header>
      <Segment raised>{excerpt}</Segment>
      <Divider horizontal>
        <Icon name="file alternate" />
      </Divider>
      <div className="blogpost" dangerouslySetInnerHTML={{__html: html}} />
      <SiteNavFooter prev={prev} next={next} />
    </Container>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: {path: {eq: $pathSlug }}) {
      html
      frontmatter {
        title
        excerpt
      }
    }
  }
`

export default Template
