import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const TitleAndDescription = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  return (
    <div className=''>
      <h1 className='title'>{title}</h1>
      <p className='subtitle'>{description}</p>
      <br />
    </div>
  )
}

const SiteHeader = () => {
  return (
    <StaticQuery
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
      render={data => <TitleAndDescription data={data} />}
    />
  )
}

export default SiteHeader
