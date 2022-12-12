import React from 'react'
import { graphql } from 'gatsby'
import SiteNavFooter from '../components/SiteNavFooter'
import 'github-markdown-css'

const Template = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { next, prev } = pageContext
  const { title, excerpt, date, image } = markdownRemark.frontmatter
  const { html } = markdownRemark

  return (
    <div>
      <section className='section'>
        <div className='container'>
          <div className='card blogCard'>
            <div className='card-content'>
              <h1 className='title has-text-centered'>{title}</h1>
              <p className='is-size-6 has-text-centered'>🗓 Publicado el {date}</p>
              <br />
              <p className='subtitle'>{excerpt}</p>
              <div className='card-image'>
                <figure className='image is-4by3 postImage'>
                  <img
                    className='postImage'
                    src={image.childImageSharp.gatsbyImageData.images.sources[0].src}
                    srcSet={image.childImageSharp.gatsbyImageData.images.sources[0].srcSet}
                    alt={`Pic for ${title}`} />
                </figure>
              </div>
            </div>
            <div
              className='markdown-body content md'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

        </div>
      </section>
      <SiteNavFooter className='section' prev={prev} next={next} />
    </div>
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
        image {
          childImageSharp {
            gatsbyImageData(width: 700, quality: 100)
          }
        }
      }
    }
  }
`

export default Template
