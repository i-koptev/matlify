import React from "react"

import {
    changeLocale,
    injectIntl,
    Link,
    FormattedMessage,
} from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import Layout from "../../components/Layout"
import BlogRoll from "../../components/BlogRoll"
import LatestPosts from "../../components/LatestPosts"
import AllCategoriesList from "../../components/AllCategoriesList"

const useStyles = makeStyles(theme => ({}))

const BlogIndexPage = ({ intl }) => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <h1
                    style={{
                        // backgroundColor: "rgba(232,232,232,0.05)",
                        color: "rgba(232,232,232,0.8)",
                        padding: "1rem 0",
                        marginTop: "0",
                    }}
                >
                    {intl.formatMessage({
                        id: `blogRollHeader`,
                    })}
                </h1>
            </Container>

            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // disableGutters
                // component="section"
                // className={classes.section}
            >
                <Grid container spacing={8}>
                    <Grid component="section" item xs={12} md={8}>
                        <BlogRoll />
                    </Grid>
                    <Grid
                        component="section"
                        item
                        xs={12}
                        md={4}
                        style={{
                            color: "white",
                        }}
                    >
                        <LatestPosts />
                        <AllCategoriesList />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
export default injectIntl(BlogIndexPage)
