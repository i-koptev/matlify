const _ = require("lodash")
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
                            title
                            heading {
                                ru
                                en
                            }
                            subheading {
                                ru
                                en
                            }
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

    // ----------------------------
    var ru = {}
    var en = {}

    const ruStatic = await fs.readFile(
        path.join(__dirname, "./src/intl/ru-static.json"),
        "utf8"
    )

    const enStatic = await fs.readFile(
        path.join(__dirname, "./src/intl/en-static.json"),
        "utf8"
    )

    result.data.allMarkdownRemark.edges.forEach(edge => {
        if (edge.node.frontmatter.heading) {
            ru[`${edge.node.id}.heading`] = edge.node.frontmatter.heading.ru
            en[`${edge.node.id}.heading`] = edge.node.frontmatter.heading.en
        }
        if (edge.node.frontmatter.subheading) {
            ru[`${edge.node.id}.subheading`] =
                edge.node.frontmatter.subheading.ru
            en[`${edge.node.id}.subheading`] =
                edge.node.frontmatter.subheading.en
        }

        /* if (edge.node.frontmatter.bodyText) {
          ru[`${edge.node.id}.bodyText`] =
            edge.node.frontmatter.bodyText.bodyTextRu;
          en[`${edge.node.id}.bodyText`] =
            edge.node.frontmatter.bodyText.bodyTextEn;
        } */

        /* 
        en[`${edge.node.slug}.title`] = edge.node.postTranslations.title
          ? edge.node.postTranslations.title
          : edge.node.title;
        en[`${edge.node.slug}.content`] = edge.node.postTranslations.content
          ? edge.node.postTranslations.content
          : edge.node.content; */
    })

    const ruRes = { ...ru, ...JSON.parse(ruStatic) }
    const enRes = { ...en, ...JSON.parse(enStatic) }

    await fs.writeFile(
        path.join(__dirname, "./src/intl/ru.json"),
        JSON.stringify(ruRes, null, 4),
        "utf8"
    )
    await fs.writeFile(
        path.join(__dirname, "./src/intl/en.json"),
        JSON.stringify(enRes, null, 4),
        "utf8"
    )
    // ----------------------------

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
