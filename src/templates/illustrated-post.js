import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import { kebabCase } from "lodash"
import Content, { HTMLContent } from "../components/Content"

import Layout from "../components/Layout"

export const IllustratedPostTemplate = ({
    // content,
    contentObject,
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
            {/* TODO - make it work with preview in admin area*/}
            <div>{contentObject}</div>

            {/* <PostContent content={content} /> */}
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

export const IllustratedPost = ({ intl, data }) => {
    const { markdownRemark: post } = data

    const theme = useTheme()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <IllustratedPostTemplate
                    contentComponent={HTMLContent}
                    title={intl.formatMessage({
                        id: `${post.id}.postTitle`,
                    })}
                    description={intl.formatMessage({
                        id: `${post.id}.postDescription`,
                    })}
                    tags={post.frontmatter.tags}
                    contentObject={
                        <div style={{ color: "#eee" }}>
                            <div>
                                {data.markdownRemark.frontmatter.illustratedPostBody.map(
                                    item => (
                                        <div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: intl.formatMessage({
                                                        id: `${data.markdownRemark.id}%${item.image.id}.illustratedPostBody`,
                                                    }),
                                                }}
                                            ></div>

                                            <div>
                                                <Img
                                                    fluid={
                                                        item.image
                                                            .childImageSharp
                                                            .fluid
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
                        </div>
                    }
                />
            </Container>
        </Layout>
    )
}

export default injectIntl(IllustratedPost)

export const illustratedPostPageQuery = graphql`
    query illustratedPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                illustratedPostBody {
                    image {
                        id
                        childImageSharp {
                            fluid(maxWidth: 1600) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                date(formatString: "MMMM DD, YYYY")
                title
                tags
            }
        }
    }
`
