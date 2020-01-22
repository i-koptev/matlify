import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Hero from "../components/Hero"

export const IndexPageTemplate = ({
    heroImage,
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
        <Hero heroImage = {heroImage} subheading = {subheading} heading = {heading} feature1 = {feature1} feature2 = {feature2} feature3 = {feature3} feature4 = {feature4}/>
        
    </>
)

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    feature1: PropTypes.string,
    feature2: PropTypes.string,
    feature3: PropTypes.string,
    feature4: PropTypes.string,
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
                heroImage={frontmatter.indexSectionHero.heroImage}
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
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
                indexSectionIntro {
                    introImage {
                        childImageSharp {
                            fluid(maxWidth: 1200, quality: 100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }

                title
            }
        }
    }
`
