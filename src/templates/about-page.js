import React from "react"

import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/Layout"

import Content, { HTMLContent } from "../components/Content"

/* 
<SEO
        title={title ? title - data.site.siteMetadata.title : data.site.siteMetadata.title}
        description={description ? description : data.site.siteMetadata.description}
        lang="ru"
      />
*/
const useStyles = makeStyles(theme => ({
    test: {
        color: "red",
        // letterSpacing: theme.spacing(0.5),
    },
    wrapper: {
        // outline: "3px solid tomato",
        // paddingTop: theme.spacing(5),
        // paddingBottom: theme.spacing(5),
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
        color: theme.palette.primary.main,
        outline: "3px solid lime",
        // margin: "1rem",
        "& img": {
            border: "10px solid rgba(0,0,0,0.1)",
        },
    },
    container: {
        // backgroundColor: "rgba(255,200,200,0.1)",
        outline: "2px solid tomato",
    },
    htmlContent: {
        color: "tomato",
        "& h2": {
            color: "red",
            textAlign: "center",
        },
    },
}))

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
                <div className={classes.wrapper}>
                    <Typography
                        className={classes.test}
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
