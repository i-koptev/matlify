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
                            categoryId
                            categoryName {
                                en
                                ru
                            }
                            postBody {
                                postSection {
                                    en
                                    ru
                                }
                                image {
                                    id
                                }
                            }
                            templateKey
                            title
                            postTitle {
                                ru
                                en
                            }
                            postDescription {
                                ru
                                en
                            }
                            aboutHeading {
                                ru
                                en
                            }
                            aboutSubheading {
                                ru
                                en
                            }
                            aboutText {
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
                                        feature1shortdescription {
                                            en
                                            ru
                                        }
                                        feature1detaileddescription {
                                            en
                                            ru
                                        }
                                    }
                                    feature2 {
                                        feature2shortdescription {
                                            en
                                            ru
                                        }
                                        feature2detaileddescription {
                                            en
                                            ru
                                        }
                                    }
                                    feature3 {
                                        feature3shortdescription {
                                            en
                                            ru
                                        }
                                        feature3detaileddescription {
                                            en
                                            ru
                                        }
                                    }
                                    feature4 {
                                        feature4shortdescription {
                                            en
                                            ru
                                        }
                                        feature4detaileddescription {
                                            en
                                            ru
                                        }
                                    }
                                }
                            }
                            indexSectionIntro {
                                introBlock {
                                    introBlockImage {
                                        id
                                    }
                                    introBlockImageALT {
                                        en
                                        ru
                                    }
                                    introBlockText {
                                        en
                                        ru
                                    }
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
                            tags
                            templateKey
                            categoryId
                        }
                    }
                }
            }
            searchPosts: allMarkdownRemark(
                limit: 1000
                filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            postBody {
                                postSection {
                                    en
                                    ru
                                }
                            }
                            postCategory
                            postTitle {
                                en
                                ru
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

    const converter = new showdown.Converter({ noHeaderId: true })

    // const pushIntoLangArray = function(){}
    // const pushIntoLangArrayHTML = function(){}

    result.data.allMarkdownRemark.edges.forEach(edge => {
        if (
            edge.node.frontmatter.categoryId &&
            edge.node.frontmatter.categoryName
        ) {
            ru[`${edge.node.frontmatter.categoryId}`] =
                edge.node.frontmatter.categoryName.ru
            en[`${edge.node.frontmatter.categoryId}`] =
                edge.node.frontmatter.categoryName.en
        }

        /////////////////////////////////////

        /*  if (edge.node.frontmatter.postBody) {
            edge.node.frontmatter.postBody.map(item => {
                ru[
                    `${edge.node.id}${item.image.id}.postBody`
                ] = converter.makeHtml(item.postSection.ru)
                en[
                    `${edge.node.id}${item.image.id}.postBody`
                ] = converter.makeHtml(item.postSection.en)
            })
        } */

        if (edge.node.frontmatter.postBody) {
            edge.node.frontmatter.postBody.map((item, index) => {
                ru[`${edge.node.id}${index}.postBody`] = converter.makeHtml(
                    item.postSection.ru
                )
                en[`${edge.node.id}${index}.postBody`] = converter.makeHtml(
                    item.postSection.en
                )
            })
        }

        //////////////////////////////////////

        if (edge.node.frontmatter.postTitle) {
            ru[`${edge.node.id}.postTitle`] = edge.node.frontmatter.postTitle.ru
            en[`${edge.node.id}.postTitle`] = edge.node.frontmatter.postTitle.en
        }

        if (edge.node.frontmatter.postDescription) {
            ru[`${edge.node.id}.postDescription`] =
                edge.node.frontmatter.postDescription.ru
            en[`${edge.node.id}.postDescription`] =
                edge.node.frontmatter.postDescription.en
        }

        if (edge.node.frontmatter.aboutHeading) {
            ru[`aboutHeading`] = edge.node.frontmatter.aboutHeading.ru
            en[`aboutHeading`] = edge.node.frontmatter.aboutHeading.en
        }

        if (edge.node.frontmatter.aboutSubheading) {
            ru[`aboutSubheading`] = edge.node.frontmatter.aboutSubheading.ru
            en[`aboutSubheading`] = edge.node.frontmatter.aboutSubheading.en
        }

        if (edge.node.frontmatter.aboutText) {
            ru[`aboutText`] = converter.makeHtml(
                edge.node.frontmatter.aboutText.ru
            )
            en[`aboutText`] = converter.makeHtml(
                edge.node.frontmatter.aboutText.en
            )
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`indexSectionHero.features.feature1.feature1shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature1.feature1shortdescription.ru
            en[`indexSectionHero.features.feature1.feature1shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature1.feature1shortdescription.en
        }
        if (edge.node.frontmatter.indexSectionHero) {
            ru[
                `indexSectionHero.features.feature1.feature1detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature1
                    .feature1detaileddescription.ru
            )
            en[
                `indexSectionHero.features.feature1.feature1detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature1
                    .feature1detaileddescription.en
            )
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`indexSectionHero.features.feature2.feature2shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature2.feature2shortdescription.ru
            en[`indexSectionHero.features.feature2.feature2shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature2.feature2shortdescription.en
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[
                `indexSectionHero.features.feature2.feature2detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature2
                    .feature2detaileddescription.ru
            )
            en[
                `indexSectionHero.features.feature2.feature2detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature2
                    .feature2detaileddescription.en
            )
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`indexSectionHero.features.feature3.feature3shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature3.feature3shortdescription.ru
            en[`indexSectionHero.features.feature3.feature3shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature3.feature3shortdescription.en
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[
                `indexSectionHero.features.feature3.feature3detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature3
                    .feature3detaileddescription.ru
            )
            en[
                `indexSectionHero.features.feature3.feature3detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature3
                    .feature3detaileddescription.en
            )
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`indexSectionHero.features.feature4.feature4shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature4.feature4shortdescription.ru
            en[`indexSectionHero.features.feature4.feature4shortdescription`] =
                edge.node.frontmatter.indexSectionHero.features.feature4.feature4shortdescription.en
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[
                `indexSectionHero.features.feature4.feature4detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature4
                    .feature4detaileddescription.ru
            )
            en[
                `indexSectionHero.features.feature4.feature4detaileddescription`
            ] = converter.makeHtml(
                edge.node.frontmatter.indexSectionHero.features.feature4
                    .feature4detaileddescription.en
            )
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`indexSectionHero.heading`] =
                edge.node.frontmatter.indexSectionHero.heading.ru
            en[`indexSectionHero.heading`] =
                edge.node.frontmatter.indexSectionHero.heading.en
        }

        if (edge.node.frontmatter.indexSectionHero) {
            ru[`indexSectionHero.subheading`] =
                edge.node.frontmatter.indexSectionHero.subheading.ru
            en[`indexSectionHero.subheading`] =
                edge.node.frontmatter.indexSectionHero.subheading.en
        }

        if (edge.node.frontmatter.indexSectionIntro) {
            edge.node.frontmatter.indexSectionIntro.introBlock.map(
                (item, index) => {
                    ru[`indexSectionIntro.text.${index}`] = converter.makeHtml(
                        item.introBlockText.ru
                    )
                    en[`indexSectionIntro.text.${index}`] = converter.makeHtml(
                        item.introBlockText.en
                    )

                    ru[
                        `${item.introBlockImage.id}.indexSectionIntro.imageAlt`
                    ] = item.introBlockImageALT.ru
                    en[
                        `${item.introBlockImage.id}.indexSectionIntro.imageAlt`
                    ] = item.introBlockImageALT.en
                }
            )
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
    var enSearchBlog = { posts: [] }
    var ruSearchBlog = { posts: [] }

    const searchPosts = result.data.searchPosts.edges

    searchPosts.forEach(edge => {
        var tempRu = {}
        var tempEn = {}
        if (
            edge.node.fields.slug &&
            edge.node.frontmatter.postTitle.ru &&
            edge.node.frontmatter.postTitle.en &&
            edge.node.frontmatter.postBody &&
            edge.node.frontmatter.postBody &&
            edge.node.frontmatter.postCategory
        ) {
            tempRu.slug = edge.node.fields.slug
            tempEn.slug = edge.node.fields.slug
            tempRu.category = edge.node.frontmatter.postCategory
            tempEn.category = edge.node.frontmatter.postCategory
            tempRu.title = edge.node.frontmatter.postTitle.ru
            tempEn.title = edge.node.frontmatter.postTitle.en
            tempRu.content = " "
            tempEn.content = " "

            edge.node.frontmatter.postBody.map(item => {
                /* tempRu.content.concat(
                    "",
                    converter.makeHtml(item.postSection.ru)
                )
                tempEn.content.concat(
                    "",
                    converter.makeHtml(item.postSection.en)
                ) */

                tempRu.content += converter
                    .makeHtml(item.postSection.ru)
                    .replace(/(<([^>]+)>|\r\n|\n|\r)/gi, "")
                    .trim()
                tempEn.content += converter
                    .makeHtml(item.postSection.en)
                    .replace(/(<([^>]+)>|\r\n|\n|\r)/gi, "")
                    .trim()

                // tempRu.content += "test"
                // tempEn.content += "test"
            })

            ruSearchBlog.posts.push(tempRu)
            enSearchBlog.posts.push(tempEn)
        }
    })
    await fs.writeFile(
        path.join(__dirname, "./static/searchIndex/ruSearchIndexBlog.json"),
        JSON.stringify(ruSearchBlog, null, 4),
        "utf8"
    )
    await fs.writeFile(
        path.join(__dirname, "./static/searchIndex/enSearchIndexBlog.json"),
        JSON.stringify(enSearchBlog, null, 4),
        "utf8"
    )

    const posts = result.data.pages.edges

    posts.forEach(edge => {
        const id = edge.node.id
        const category = edge.node.frontmatter.categoryId
            ? edge.node.frontmatter.categoryId
            : ""
        actions.createPage({
            path: edge.node.fields.slug,
            tags: edge.node.frontmatter.tags,
            component: path.resolve(
                `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {
                id,
                category,
            },
        })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
        if (_.get(edge, `node.frontmatter.tags`)) {
            tags = tags.concat(edge.node.frontmatter.tags)
        }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`

        actions.createPage({
            path: tagPath,
            component: path.resolve(`src/templates/tags-page.js`),
            context: {
                tag,
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
