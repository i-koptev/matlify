import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import {
    changeLocale,
    injectIntl,
    Link,
    FormattedMessage,
} from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import PreviewCompatibleImage from "./PreviewCompatibleImage"

const useStyles = makeStyles(theme => ({
    article: {
        // outline: "3px solid tomato",
        padding: "2.5rem 2rem",
        backgroundColor: "rgba(255,255,255,0.9)",
        marginBottom: "1rem",
        "& img": {
            border: "10px solid rgba(0,0,0,0.1)",
        },
    },
    articleHeader: {
        fontFamily: "PT Sans, sans-serif",
        fontWeight: "700",
        color: "tomato",
        textTransform: "uppercase",
    },
    articleHeaderLink: {
        textDecoration: "none !important",
    },
    articleMeta: {
        fontFamily: "PT Sans, sans-serif",
        fontWeight: "400",
        color: "rgba(0,0,0,0.9)",
        textTransform: "uppercase",
        fontSize: "0.8rem",
        letterSpacing: "0.05em",
        padding: "0.6em 0 1.2em 0",
        "& span": {
            marginRight: "2em",
        },
    },
    test: {
        flexGrow: 1,
        [theme.breakpoints.down("sm")]: {
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up("md")]: {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up("lg")]: {
            backgroundColor: theme.palette.primary.ikky,
        },
    },
}))

const BlogRoll = ({ intl }) => {
    const qdata = useStaticQuery(graphql`
        query BlogRollQuery {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {
                    frontmatter: {
                        templateKey: { in: ["blog-post", "illustrated-post"] }
                    }
                }
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 400)
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            categoryId
                            title
                            templateKey
                            date(formatString: "DD. MM. YYYY")
                            featuredpost
                            featuredimage {
                                childImageSharp {
                                    fluid(maxWidth: 800, quality: 100) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const { edges: posts } = qdata.allMarkdownRemark

    const classes = useStyles()
    const theme = useTheme()

    return (
        <div>
            {posts &&
                posts.map(({ node: post }) => (
                    <div key={post.id}>
                        <article
                            className={`${classes.article}  ${
                                post.frontmatter.featuredpost
                                    ? "is-featured"
                                    : ""
                            }`}
                        >
                            <Link
                                className={classes.articleHeaderLink}
                                to={post.fields.slug}
                            >
                                <Typography
                                    className={classes.articleHeader}
                                    variant="h5"
                                    component="h2"
                                    // gutterBottom
                                >
                                    {intl.formatMessage({
                                        id: `${post.id}.postTitle`,
                                    })}
                                </Typography>
                            </Link>
                            <Typography
                                component="section"
                                className={classes.articleMeta}
                                variant="subtitle2"
                                gutterBottom
                            >
                                <span>Posted: {post.frontmatter.date}</span>
                                <span>Author: Admin</span>
                                <span>
                                    Category:
                                    {post.categoryId
                                        ? intl.formatMessage({
                                              id: `${post.categoryId}`,
                                          })
                                        : " Uncategorized"}
                                </span>
                            </Typography>

                            {post.frontmatter.featuredimage ? (
                                <PreviewCompatibleImage
                                    imageInfo={{
                                        image: post.frontmatter.featuredimage,
                                        alt:
                                            `featured image thumbnail for post` +
                                            intl.formatMessage({
                                                id: `${post.id}.postTitle`,
                                            }),
                                    }}
                                />
                            ) : null}
                            <div>
                                <div>
                                    Excerpt goes here ... TODO in BlogRoll.js{" "}
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quisquam possimus sint ut
                                    a sapiente nulla quaerat dolorum earum et
                                    aperiam! Eos molestias ab eaque. Magnam
                                    culpa voluptatum adipisci magni itaque.
                                </div>
                                <br />
                                <br />
                                <Link className="" to={post.fields.slug}>
                                    Keep Reading →
                                </Link>
                            </div>
                        </article>
                    </div>
                ))}
        </div>
    )
}
/* 
BlogRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}
 */
export default injectIntl(BlogRoll)
