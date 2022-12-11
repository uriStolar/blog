import React from 'react'
import { Link } from 'gatsby'
import SiteNavFooter from '../components/SiteNavFooter'

const AllTagsTemplate = ({ data, pageContext }) => {
  const { tags } = pageContext
  return (
    <section className='section allTags'>
      <div className='container'>
        <p className='title'>Etiquetas</p>
        <ul className='tags are-medium'>
          {tags.map((tag, idx) => {
            return (
              <li key={idx} className='tag'>
                <Link to={`/tags/${tag}`} className='blackText'>{tag}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <br />
      <SiteNavFooter className='bottom' />
    </section>
  )
}

export default AllTagsTemplate
