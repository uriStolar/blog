const path = require('path')

exports.onCreateWebpackConfig = ({ getConfig, stage, actions, loaders }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            loaders.null(),
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    }
  })
}

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')

  const postsByTag = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }
        postsByTag[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort()
    }
  })

  tags.forEach(tagName => {
    const posts = postsByTag[tagName]

    createPage({
      path: `/tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        posts,
        tagName
      }
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions


    return new Promise((resolve, reject) => {
      const blogPostTemplate = path.resolve('src/templates/blogPost.js')

      resolve(
        graphql(`
          query {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              limit: 1000
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                    tags
                  }
                }
              }
            }
          }
        `)
          .then(result => {
            if (result.errors) {
              return reject(result.errors)
            }
            const posts = result.data.allMarkdownRemark.edges
            createTagPages(createPage, posts)
            posts.forEach(({ node }, idx) => {
              const path = node.frontmatter.path
              createPage({
                path,
                component: blogPostTemplate,
                context: {
                  pathSlug: path,
                  prev: idx === 0 ? null : posts[idx - 1].node,
                  next: idx === posts.length - 1 ? null : posts[idx + 1].node
                }
              })
              resolve()
            })
          })
      )
    })
}
