import React from "react"
import { graphql } from "gatsby"
import { Container, Header } from "semantic-ui-react"
import SiteNavFooter from "../components/SiteNavFooter"

const Template = ({data, pageContext}) => {
  const {markdownRemark} = data
  const {next, prev} = pageContext
  const {title} = markdownRemark.frontmatter
  const {html} = markdownRemark

  return (
    <Container textAlign="justified">
      <Header as="h4">{title}</Header>
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
      }
    }
  }
`

export default Template

// <List bulleted horizontal>
//           <List.Item><Link to="/">Home</Link></List.Item>
//           {prev && <List.Item><Link to={prev.frontmatter.path}>Previous</Link></List.Item>}
//           {next && <List.Item><Link to={next.frontmatter.path}>Next</Link></List.Item>}
//         </List>