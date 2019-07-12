import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const TitleAndDescription = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-brand'>
        <a href='https://uristolar.com'>
          <figure className='image is-48x48'>
            <img src='https://uristolar.com/img/ush-sml-pxl.png' className=''
              alt='Uri Stolar' />
          </figure>
        </a>
      </div>
      <a href='https://uristolar.com' className='navbar-item'>
        <span className='title'>{title}</span>
      </a>
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
