import React from 'react'
import { Link } from 'gatsby'
import SiteNavFooter from '../components/SiteNavFooter'

const AllTagsTemplate = ({ data, pageContext }) => {
  const { tags } = pageContext
  return (
    <section className='section'>
      <div className='container'>
        <p className='title'>Tags</p>
        <ul className='tags are-medium'>
          {tags.map((tag, idx) => {
            return (
              <li key={idx} className='tag'>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <br />
      <SiteNavFooter className='section' />
    </section>
  )
}

export default AllTagsTemplate
