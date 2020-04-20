import React from "react"
import Helmet from "react-helmet"

import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import { kebabCase } from "lodash"

import Layout from "../components/Layout"

import { useEffect } from "react"
import Prism from "prismjs"
// import "prism-theme-night-owl"
// import "../../src/nightOwlForPrism.css"

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: "2rem",
        marginBottom: "3.5rem",
        color: "#fffc",
    },

    htmlContent: {
        color: theme.typography.body1.color,
        "& h2": {
            color: theme.typography.h2.color,
            // color: theme.typography.h2.color,
            fontFamily: theme.typography.h2.fontFamily,
            fontWeight: theme.typography.h2.fontWeight,
            // color: "red",
            // textAlign: "center",
        },
    },
    imageWrapper: {
        width: "50%",
        float: "left",
        marginRight: "3vw",
        marginBottom: "1vw",
        // border: "1px solid #fff3",
        padding: "0.7vw",
        paddingBottom: "2vw",
        // backgroundColor: "#fff1",
    },
}))

const IllustratedPost = ({ intl, data }) => {
    const { markdownRemark: post } = data
    const tags = post.frontmatter.tags

    const theme = useTheme()
    const classes = useStyles()

    useEffect(() => {
        // call the highlightAll() function to style our code blocks
        Prism.highlightAll()
    })

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <div style={{ color: "white" }}>
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
                    <Typography
                        className={classes.header}
                        variant="h3"
                        component="h1"
                        align="center"
                    >
                        {intl.formatMessage({
                            id: `${post.id}.postTitle`,
                        })}
                    </Typography>

                    <div>
                        {data.markdownRemark.frontmatter.illustratedPostBody.map(
                            item => (
                                <div
                                    key={`${data.markdownRemark.id}${item.image.id}.illustratedPostBody`}
                                    // style={{ clear: "both" }}
                                >
                                    <div className={classes.imageWrapper}>
                                        <Img
                                            fluid={
                                                item.image.childImageSharp.fluid
                                            }
                                        />
                                    </div>
                                    <div
                                        className={classes.htmlContent}
                                        dangerouslySetInnerHTML={{
                                            __html: intl.formatMessage({
                                                id: `${data.markdownRemark.id}${item.image.id}.illustratedPostBody`,
                                            }),
                                        }}
                                    />
                                </div>
                            )
                        )}
                    </div>

                    {/* <pre>{JSON.stringify(tags, null, 4)}</pre> */}
                    {tags && tags.length ? (
                        // TODO make norm clear
                        <div style={{ clear: "both" }}>
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
