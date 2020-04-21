import React from "react"
import Helmet from "react-helmet"

import { graphql } from "gatsby"
import Img from "gatsby-image"
import { injectIntl, Link } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import Layout from "../components/Layout"

const useStyles = makeStyles(theme => ({
    test: {
        color: "#eee",
    },
}))

const CategoryPage = props => {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <div className={classes.test}>
                    <h2>
                        {props.data.allMarkdownRemark.totalCount} posts under{" "}
                        {props.pageContext.category} category.
                    </h2>
                    {props.data.allMarkdownRemark.edges.map(edge => (
                        <div key={edge.node.id}>
                            <div>id: {edge.node.id}</div>
                            <Link to={edge.node.fields.slug}>
                                link: {edge.node.fields.slug}
                            </Link>
                            <div>
                                title:{" "}
                                {props.intl.formatMessage({
                                    id: `${edge.node.id}.postTitle`,
                                })}
                            </div>
                            <div>
                                description:{" "}
                                {props.intl.formatMessage({
                                    id: `${edge.node.id}.postDescription`,
                                })}
                            </div>
                            <div>date: {edge.node.frontmatter.date}</div>
                            <hr />
                        </div>
                    ))}
                </div>
            </Container>
        </Layout>
    )
}

export default injectIntl(CategoryPage)

export const categoryPageQuery = graphql`
    query categoryByPostCategory($category: String!) {
        allMarkdownRemark(
            filter: { frontmatter: { postCategory: { eq: $category } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                        featuredpost
                        featuredimage {
                            childImageSharp {
                                fluid {
                                    srcSet
                                }
                            }
                        }
                    }
                }
            }
            totalCount
        }
    }
`
