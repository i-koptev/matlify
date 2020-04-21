import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    link: {
        color: "tomato",
        textDecoration: "none",
        "& span": {
            color: "#eee7",
            fontWeight: "normal",
            fontSize: "1rem",
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
            <h3>
                {intl.formatMessage({
                    id: `latestposts`,
                })}
            </h3>
            {posts &&
                posts.map(({ node: post }) => (
                    <div key={post.id}>
                        <Link to={post.fields.slug} className={classes.link}>
                            <h3>
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
                            </h3>
                        </Link>
                    </div>
                ))}
        </div>
    )
}
export default injectIntl(LatestPosts)
