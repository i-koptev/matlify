const _ = require("lodash")
const path = require("path")
const showdown = require("showdown")
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
                        frontmatter {
                            templateKey
                            title
                            aboutHeading {
                                ru
                                en
                            }
                            aboutSubheading {
                                ru
                                en
                            }
                            indexSectionHero {
                                heading {
                                    en
                                    ru
                                }
                                subheading {
                                    en
                                    ru
                                }
                                features {
                                    feature1 {
                                        en
                                        ru
                                    }
                                    feature2 {
                                        en
                                        ru
                                    }
                                    feature3 {
                                        en
                                        ru
                                    }
                                    feature4 {
                                        en
                                        ru
                                    }
                                }
                            }
                            indexSectionIntro {
                                text {
                                    en
                                    ru
                                }
                                heading {
                                    en
                                    ru
                                }
                                button {
                                    en
                                    ru
                                }
                            }
                            seoSiteDescription {
                                en
                                ru
                            }
                            seoSiteTitle {
                                en
                                ru
                            }
                        }
                    }
                }
            }
            pages: allMarkdownRemark(
                limit: 1000
                filter: { frontmatter: { templateKey: { ne: "meta-page" } } }
            ) {
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

    const converter = new showdown.Converter()

    // const pushIntoLangArray = function(){}
    // const pushIntoLangArrayHTML = function(){}

    result.data.allMarkdownRemark.edges.forEach(edge => {
        if (edge.node.frontmatter.aboutHeading) {
            ru[`${edge.node.id}.aboutHeading`] =
                edge.node.frontmatter.aboutHeading.ru
            en[`${edge.node.id}.aboutHeading`] =
                edge.node.frontmatter.aboutHeading.en
        }

        if (edge.node.frontmatter.aboutSubheading) {
            ru[`${edge.node.id}.aboutSubheading`] = converter.makeHtml(
                edge.node.frontmatter.aboutSubheading.ru
            )
            en[`${edge.node.id}.aboutSubheading`] = converter.makeHtml(
                edge.node.frontmatter.aboutSubheading.en
            )
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`${edge.node.id}.indexSectionHero.features.feature1`] =
                edge.node.frontmatter.indexSectionHero.features.feature1.ru
            en[`${edge.node.id}.indexSectionHero.features.feature1`] =
                edge.node.frontmatter.indexSectionHero.features.feature1.en
        }
        if (edge.node.frontmatter.indexSectionHero) {
            ru[`${edge.node.id}.indexSectionHero.features.feature2`] =
                edge.node.frontmatter.indexSectionHero.features.feature2.ru
            en[`${edge.node.id}.indexSectionHero.features.feature2`] =
                edge.node.frontmatter.indexSectionHero.features.feature2.en
        }
        if (edge.node.frontmatter.indexSectionHero) {
            ru[`${edge.node.id}.indexSectionHero.features.feature3`] =
                edge.node.frontmatter.indexSectionHero.features.feature3.ru
            en[`${edge.node.id}.indexSectionHero.features.feature3`] =
                edge.node.frontmatter.indexSectionHero.features.feature3.en
        }
        if (edge.node.frontmatter.indexSectionHero) {
            ru[`${edge.node.id}.indexSectionHero.features.feature4`] =
                edge.node.frontmatter.indexSectionHero.features.feature4.ru
            en[`${edge.node.id}.indexSectionHero.features.feature4`] =
                edge.node.frontmatter.indexSectionHero.features.feature4.en
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`${edge.node.id}.indexSectionHero.heading`] =
                edge.node.frontmatter.indexSectionHero.heading.ru
            en[`${edge.node.id}.indexSectionHero.heading`] =
                edge.node.frontmatter.indexSectionHero.heading.en
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`${edge.node.id}.indexSectionHero.subheading`] =
                edge.node.frontmatter.indexSectionHero.subheading.ru
            en[`${edge.node.id}.indexSectionHero.subheading`] =
                edge.node.frontmatter.indexSectionHero.subheading.en
        }

        if (edge.node.frontmatter.indexSectionIntro) {
            ru[`${edge.node.id}.indexSectionIntro.heading`] =
                edge.node.frontmatter.indexSectionIntro.heading.ru
            en[`${edge.node.id}.indexSectionIntro.heading`] =
                edge.node.frontmatter.indexSectionIntro.heading.en
        }

        if (edge.node.frontmatter.indexSectionIntro) {
            ru[`${edge.node.id}.indexSectionIntro.text`] =
                edge.node.frontmatter.indexSectionIntro.text.ru
            en[`${edge.node.id}.indexSectionIntro.text`] =
                edge.node.frontmatter.indexSectionIntro.text.en
        }

        if (edge.node.frontmatter.indexSectionIntro) {
            ru[`${edge.node.id}.indexSectionIntro.button`] =
                edge.node.frontmatter.indexSectionIntro.button.ru
            en[`${edge.node.id}.indexSectionIntro.button`] =
                edge.node.frontmatter.indexSectionIntro.button.en
        }

        if (edge.node.frontmatter.seoSiteDescription) {
            ru[`seoSiteDescription`] =
                edge.node.frontmatter.seoSiteDescription.ru
            en[`seoSiteDescription`] =
                edge.node.frontmatter.seoSiteDescription.en
        }

        if (edge.node.frontmatter.seoSiteTitle) {
            ru[`seoSiteTitle`] = edge.node.frontmatter.seoSiteTitle.ru
            en[`seoSiteTitle`] = edge.node.frontmatter.seoSiteTitle.en
        }
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

    const posts = result.data.pages.edges

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
