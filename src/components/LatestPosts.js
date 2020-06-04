import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    link: {
        color: "#E0DEDE",
        textDecoration: "none",
        "& span": {
            color: "rgba(170, 166, 166, 1)",
            fontWeight: "normal",
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
        },
    },
}))

const LatestPosts = ({ intl }) => {
    const qdata = useStaticQuery(graphql`
        query LatestPostsQuery {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {
                    frontmatter: {
                        templateKey: { in: ["blog-post", "illustrated-post"] }
                    }
                }
                limit: 10
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            postCategory
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
            <h2
                style={{
                    fontFamily: "PT Sans",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textTransform: "uppercase",
                    color: theme.typography.h2.color,
                    marginTop: "3rem",
                    letterSpacing: "0.15em",
                }}
            >
                {intl.formatMessage({
                    id: `latestposts`,
                })}
            </h2>
            {posts &&
                posts.map(({ node: post }) => (
                    <div key={post.id}>
                        <Link
                            to={post.fields.slug}
                            className={classes.link}
                            style={{
                                fontFamily: "PT Sans",
                                fontWeight: "400",
                                fontSize: "1.1rem",
                                letterSpacing: "0.1em",
                            }}
                        >
                            {intl.formatMessage({
                                id: `${post.id}.postTitle`,
                            })}{" "}
                            <span>
                                ({" "}
                                {`${intl
                                    .formatMessage({
                                        id: "category",
                                    })
                                    .toLowerCase()}: `}
                                :{" "}
                                {intl.formatMessage({
                                    id: `${post.frontmatter.postCategory}`,
                                })}{" "}
                                )
                            </span>
                        </Link>
                    </div>
                ))}
        </div>
    )
}
export default injectIntl(LatestPosts)
