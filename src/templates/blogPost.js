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
              <p className='title has-text-centered'>{title}</p>
              <p className='is-size-6 has-text-centered'>Publicado el {date}</p>
              <br />
              <p className='subtitle'>{excerpt}</p>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img
                    src={image.childImageSharp.sizes.src}
                    srcSet={image.childImageSharp.sizes.srcSet}
                    alt={`Pic for ${title}`} />
                </figure>
              </div>
            </div>
            <div
              className='markdown-body'
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
            sizes(maxWidth: 720, quality: 85) {
              ...GatsbyImageSharpSizes_noBase64
            }
          }
        }
      }
    }
  }
`

export default Template
