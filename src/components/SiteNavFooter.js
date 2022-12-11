import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const SiteNavFooter = props => {
  return (
    <footer className='footer'>
      <ul className='container has-text-centered level'>
        <li className='level-item'>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} size='lg' className='blackText'/>
            <span className='is-size-5 blackText'>&nbsp;Inicio</span>
          </Link>
        </li>
        {props.prev && (
          <li className='level-item'>
            <Link to={props.prev.frontmatter.path}>
              <FontAwesomeIcon icon={faArrowLeft} size='lg' className='blackText' />
              <span className='is-size-5 blackText'>&nbsp;Anterior</span>
            </Link>
          </li>
        )}
        {props.next && (
          <li className='level-item'>
            <Link to={props.next.frontmatter.path}>
              <span className='is-size-5 blackText'>Siguiente&nbsp;</span>
              <FontAwesomeIcon icon={faArrowRight} size='lg' className='blackText' />
            </Link>
          </li>
        )}
      </ul>
    </footer>
  )
}

export default SiteNavFooter
