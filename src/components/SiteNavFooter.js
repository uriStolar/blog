import React from 'react'
import { Link } from 'gatsby'
import { Divider, List } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const SiteNavFooter = props => {
  return (
    <div>
      <Divider />
      <List bulleted horizontal>
        <List.Item>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} size='lg' />
          </Link>
        </List.Item>
        {props.prev && (
          <List.Item>
            <Link to={props.prev.frontmatter.path}>
              <FontAwesomeIcon icon={faArrowLeft} size='lg' />
            </Link>
          </List.Item>
        )}
        {props.next && (
          <List.Item>
            <Link to={props.next.frontmatter.path}>
              <FontAwesomeIcon icon={faArrowRight} size='lg' />
            </Link>
          </List.Item>
        )}
      </List>
    </div>
  )
}

export default SiteNavFooter
