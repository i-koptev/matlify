import React from "react"
import { graphql, Link } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"

import Img from "gatsby-image"

export const Vost = ({ intl, data }) => {
    const theme = useTheme()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <div style={{ color: "#eee" }}>
                    <div>
                        {data.markdownRemark.frontmatter.illustratedPostBody.map(
                            item => (
                                <div>
                                    <p>
                                        Section ID:
                                        {`${data.markdownRemark.id}%${item.image.id}.illustratedPostBody`}
                                    </p>
                                    <p>
                                        {intl.formatMessage({
                                            id: `${data.markdownRemark.id}%${item.image.id}.illustratedPostBody`,
                                        })}
                                    </p>
                                    <div>
                                        <Img
                                            fluid={
                                                item.image.childImageSharp.fluid
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </div>
            </Container>
        </Layout>
    )
}

export default injectIntl(Vost)

export const illustratedBlogPageQuery = graphql`
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
