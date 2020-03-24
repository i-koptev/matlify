import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

const useStyles = makeStyles(theme => ({
    test: {
        "& img": {
            border: "10px solid rgba(0,0,0,0.1)",
        },
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

export const BlogPostTemplate = ({
    content,
    contentComponent,
    description,
    tags,
    title,
    helmet,
}) => {
    const PostContent = contentComponent || Content

    return (
        <div style={{ color: "white" }}>
            {helmet || ""}

            <h1>{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
                <div>
                    <h4>Tags</h4>
                    <ul>
                        {tags.map(tag => (
                            <li key={tag + `tag`}>
                                <Link to={`/tags/${kebabCase(tag)}/`}>
                                    {tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const BlogPost = ({ intl, data }) => {
    const { markdownRemark: post } = data
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <BlogPostTemplate
                    content={intl.formatMessage({
                        id: `${post.id}.postBody`,
                    })}
                    contentComponent={HTMLContent}
                    description={intl.formatMessage({
                        id: `${post.id}.postDescription`,
                    })}
                    helmet={
                        <Helmet titleTemplate="%s | Blog">
                            <title>
                                {intl.formatMessage({
                                    id: `${post.id}.postTitle`,
                                })}
                            </title>
                            <meta
                                name="description"
                                content={intl.formatMessage({
                                    id: `${post.id}.postDescription`,
                                })}
                            />
                        </Helmet>
                    }
                    tags={post.frontmatter.tags}
                    title={intl.formatMessage({
                        id: `${post.id}.postTitle`,
                    })}
                />
            </Container>
        </Layout>
    )
}

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default injectIntl(BlogPost)

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
    }
`
