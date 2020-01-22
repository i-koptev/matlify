import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

/* 
<SEO
        title={title ? title - data.site.siteMetadata.title : data.site.siteMetadata.title}
        description={description ? description : data.site.siteMetadata.description}
        lang="ru"
      />
*/

export const AboutPageTemplate = ({ title, html }) => (
    <div
        style={{
            maxWidth: "800px",
            margin: "0 auto",
        }}
    >
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    </div>
)

AboutPageTemplate.propTypes = {
    title: PropTypes.string,
}

const AboutPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <AboutPageTemplate
            title={frontmatter.title}
            html={data.markdownRemark.html}
        />
    )
}

AboutPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default AboutPage

export const pageQuery = graphql`
    query AboutPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
            frontmatter {
                title
            }
            html
        }
    }
`
