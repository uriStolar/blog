import React from 'react'
import { Link } from 'gatsby'
import { Divider, List } from 'semantic-ui-react'

const SiteNavFooter = props => {
  return (
    <div>
      <Divider />
      <List bulleted horizontal>
        <List.Item>
          <Link to='/'>Home</Link>
        </List.Item>
        {props.prev && (
          <List.Item>
            <Link to={props.prev.frontmatter.path}>Previous</Link>
          </List.Item>
        )}
        {props.next && (
          <List.Item>
            <Link to={props.next.frontmatter.path}>Next</Link>
          </List.Item>
        )}
      </List>
    </div>
  )
}

export default SiteNavFooter
