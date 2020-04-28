import React from "react"

import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/Layout"

import { PrismCode } from "../components/Prism"

import Content, { HTMLContent } from "../components/Content"
import { Grid, withStyles, Button } from "@material-ui/core"
import TestCard from "../components/TestCard"
const styles = {
    root: {
        maxWidth: 345,
        color: "white",
    },
}
/* 
<SEO
        title={title ? title - data.site.siteMetadata.title : data.site.siteMetadata.title}
        description={description ? description : data.site.siteMetadata.description}
        lang="ru"
      />
*/
const useStyles = makeStyles(theme => ({
    container: {
        outline: theme.mainNavigationBorderBottom,
        marginTop: `${theme.siteSpacing.aboutPage * 8}px`,
        marginBottom: `${theme.siteSpacing.aboutPage * 8}px`,
        // backgroundColor: "rgba(255,200,200,0.1)",
    },
    htmlContent: {
        "& h2": {
            ...theme.typography.h5,
            paddingBottom: `${theme.siteSpacing.aboutPage * 4}px`,
            paddingLeft: `${theme.siteSpacing.aboutPage * 8}px`,
            // textAlign: "center",
        },
        "& p": {
            ...theme.html.paragraph,
            // color: "olive",
        }, //переопределение!!!
    },
    paragraph: theme.html.paragraph,
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
                <TestCard />
                {/* <PrismCode
                    code={code}
                    language="jsx"
                    plugins={["line-numbers"]}
                /> */}
                <Grid
                    container
                    direction="column"
                    spacing={theme.siteSpacing.aboutPage}
                >
                    <Grid item>
                        <Typography
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
                    </Grid>
                    <Grid item>
                        <div
                            className={classes.htmlContent}
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: `aboutText`,
                                }),
                            }}
                        ></div>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={theme.siteSpacing.aboutPage}>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                component="section"
                                id="footerSection"
                                className="footerSection"
                            >
                                <Typography
                                    variant="h5"
                                    align="center"
                                    gutterBottom
                                >
                                    Section 1
                                </Typography>
                                <Typography
                                    variant="body2"
                                    paragraph
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor siiit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    gutterBottom
                                >
                                    Section 2
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    paragraph="true"
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum d dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    gutterBottom
                                >
                                    Section 3
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <HTMLContent
                        content={intl.formatMessage({ id: `aboutText` })}
                    ></HTMLContent> */}
                {/* <pre style={{ color: "white" }}>
                    {JSON.stringify(theme, null, 4)}
                </pre> */}
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
