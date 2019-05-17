import React from "react"
import { Header } from "semantic-ui-react"
import { StaticQuery, graphql } from 'gatsby'

const TitleAndDescription = ({ data }) => {
  const { title, description } =  data.site.siteMetadata
  return (
    <div>
      <Header as="h2">{title}</Header>
      <p>{description}</p>
    </div>
  )
}

const SiteHeader = () => {
  return (<StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
         }
       }
    `}
    render={data => <TitleAndDescription data={data}></TitleAndDescription>}
  />)
}

export default SiteHeader
