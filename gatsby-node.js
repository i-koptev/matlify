/* const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
// const fs = require("fs");
const fs = require("fs").promises

exports.createPages = async ({ actions, graphql, reporter }) => {
    const result = await graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            templateKey
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        // reporter.panicOnBuild(`Error while running GraphQL query.`);
        reporter.panic("Error while running GraphQL query.", result.errors)
        return
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
        const id = edge.node.id
        actions.createPage({
            path: edge.node.fields.slug,
            component: path.resolve(
                `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {
                id,
            },
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    fmImagesToRelative(node) // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
 */