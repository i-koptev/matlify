import React from "react"

import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/Layout"

import { PrismCode } from "../components/Prism"

import Content, { HTMLContent } from "../components/Content"

/* 
<SEO
        title={title ? title - data.site.siteMetadata.title : data.site.siteMetadata.title}
        description={description ? description : data.site.siteMetadata.description}
        lang="ru"
      />
*/
const useStyles = makeStyles(theme => ({
    container: {
        outline: "2px solid tomato",
        // backgroundColor: "rgba(255,200,200,0.1)",
    },
    wrapper: {
        outline: "3px solid lime",
        // backgroundColor: "rgba(255,200,200,0.1)",

        paddingTop: theme.spacing(5),
        // paddingBottom: theme.spacing(5),
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
        // color: theme.palette.primary.main,
        // margin: "1rem",
        "& img": {
            border: "10px solid rgba(0,0,0,0.1)",
        },
    },
    header: {
        // color: "red",
        // letterSpacing: theme.spacing(0.5),
    },
    htmlContent: {
        color: theme.typography.body1.color,
        "& h2": {
            color: "teal",
            // color: theme.typography.h2.color,
            fontFamily: theme.typography.h2.fontFamily,
            fontWeight: theme.typography.h2.fontWeight,
            // color: "red",
            textAlign: "center",
        },
    },
}))

const code = `
const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
            <h2>{post.node.frontmatter.title}</h2>
        </Link>
    </li>
))
`

const AboutPage = ({ intl, data }) => {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                component="section"
                className={classes.container}
            >
                <PrismCode
                    code={code}
                    language="jsx"
                    plugins={["line-numbers"]}
                />
                <div className={classes.wrapper}>
                    <Typography
                        className={classes.header}
                        variant="h3"
                        component="h1"
                        align="center"
                        // color="error"
                        // color="textPrimary"
                        // color={theme.palette.primary.ikky}
                    >
                        {intl.formatMessage({ id: `aboutHeading` })}
                    </Typography>
                    <Typography variant="h4" component="h2" align="center">
                        {intl.formatMessage({ id: `aboutSubheading` })}
                    </Typography>
                    <div
                        className={classes.htmlContent}
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({ id: `aboutText` }),
                        }}
                    ></div>
                    <Typography variant="body1" gutterBottom>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Iste officiis assumenda excepturi dignissimos!
                        Neque, nostrum expedita, tempora suscipit dolorum
                        quaerat cum rerum quod reiciendis cumque at voluptate!
                        Reiciendis, tenetur veniam?
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Iste officiis assumenda excepturi dignissimos!
                        Neque, nostrum expedita, tempora suscipit dolorum
                        quaerat cum rerum quod reiciendis cumque at voluptate!
                        Reiciendis, tenetur veniam?
                    </Typography>
                    {/* <HTMLContent
                        content={intl.formatMessage({ id: `aboutText` })}
                    ></HTMLContent> */}
                </div>
            </Container>
        </Layout>
    )
}

export default injectIntl(AboutPage)

export const pageQuery = graphql`
    query AboutPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
            frontmatter {
                title
            }
        }
    }
`
