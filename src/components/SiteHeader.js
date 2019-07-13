import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const TitleAndDescription = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-brand'>
        <OutboundLink href='https://uristolar.com'>
          <figure className='image is-48x48'>
            <img src='https://uristolar.com/img/ush-sml-pxl.png' className=''
              alt='Uri Stolar' />
          </figure>
        </OutboundLink>
      </div>
      <OutboundLink href='https://uristolar.com' className='navbar-item'>
        <span className='title'>{title}</span>
      </OutboundLink>
      <div className='navbar-end'>
        <span className='navbar-item subtitle'>{description}</span>
      </div>
    </nav>
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
