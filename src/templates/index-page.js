/* import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

export const IndexPageTemplate = ({ image, title, heading, subheading }) => (
    <div
        style={{
            maxWidth: "1140px",
            margin: "0 auto",
        }}
    >
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
            }}
        ></div>
        <div>
            <h1>{title}</h1>
            <h3>{heading}</h3>
            <h3>{subheading}</h3>
        </div>
    </div>
)

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
}

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <IndexPageTemplate
            image={frontmatter.image}
            title={frontmatter.title}
            heading={frontmatter.heading}
            subheading={frontmatter.subheading}
        />
    )
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 1200, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                heading
                subheading
            }
        }
    }
`
 */
