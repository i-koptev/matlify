import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import {
    changeLocale,
    injectIntl,
    Link,
    FormattedMessage,
} from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Hero from "../components/Hero"

export const IndexPageTemplate = ({
    image,
    title,
    heading,
    subheading,
    feature1,
    feature2,
    feature3,
    feature4,
}) => (
    <>
        <Hero />
        <div
            style={{
                height: "50vh",
                backgroundImage: `url(${
                    !!image.childImageSharp
                        ? image.childImageSharp.fluid.src
                        : image
                })`,
                backgroundPosition: `top left`,
                backgroundAttachment: `fixed`,
                color: "white",
                padding: " 0 2rem",
            }}
        >
            <h1>{title}</h1>
            <h3>{heading}</h3>
            <h3>{subheading}</h3>
            <ul>
                <li>{feature1}</li>
                <li>{feature2}</li>
                <li>{feature3}</li>
                <li>{feature4}</li>
            </ul>
        </div>
        <div></div>
    </>
)

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
}

const IndexPage = ({ intl, data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout
            title={intl.formatMessage({
                id: `seoSiteTitle`,
            })}
            description={intl.formatMessage({
                id: `seoSiteDescription`,
            })}
            lang={intl.locale}
        >
            <IndexPageTemplate
                image={frontmatter.indexSectionHero.heroImage}
                title={frontmatter.title}
                heading={intl.formatMessage({
                    id: `indexSectionHero.heading`,
                })}
                subheading={intl.formatMessage({
                    id: `indexSectionHero.subheading`,
                })}
                feature1={intl.formatMessage({
                    id: `indexSectionHero.features.feature1`,
                })}
                feature2={intl.formatMessage({
                    id: `indexSectionHero.features.feature2`,
                })}
                feature3={intl.formatMessage({
                    id: `indexSectionHero.features.feature3`,
                })}
                feature4={intl.formatMessage({
                    id: `indexSectionHero.features.feature4`,
                })}
            />
            {/* <pre>{JSON.stringify(intl, null, 4)}</pre> */}
        </Layout>
    )
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default injectIntl(IndexPage)

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            id
            frontmatter {
                indexSectionHero {
                    heroImage {
                        childImageSharp {
                            fluid(maxWidth: 1200, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                indexSectionIntro {
                    introImage {
                        childImageSharp {
                            fluid(maxWidth: 1200, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }

                title
            }
        }
    }
`
