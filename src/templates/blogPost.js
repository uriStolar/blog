import React from 'react'
import { graphql } from 'gatsby'
import SiteNavFooter from '../components/SiteNavFooter'
import 'github-markdown-css'

const Template = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { next, prev } = pageContext
  const { title, excerpt, date } = markdownRemark.frontmatter
  const { html } = markdownRemark

  return (
    <section className='section'>
      <div className='container'>
        <p className='title'>{title}</p>
        <div className='box'>
          <p className='subtitle'>{excerpt}</p>
          <p className='is-size-6'>Publicado el {date}</p>
        </div>
        <div
          className='container markdown-body'
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <SiteNavFooter className='section' prev={prev} next={next} />
      </div>
    </section>
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
