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
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Layout from "../../components/Layout"
import BlogRoll from "../../components/BlogRoll"
import LatestPosts from "../../components/LatestPosts"
import AllCategoriesList from "../../components/AllCategoriesList"

const useStyles = makeStyles(theme => ({}))

const BlogIndexPage = ({ intl }) => {
    const classes = useStyles()
    const theme = useTheme()

    const medium = useMediaQuery(theme.breakpoints.down("md"))
    const large = useMediaQuery(theme.breakpoints.down("lg"))
    const adaptiveSpacing = medium ? 4 : large ? 8 : 10

    const [categories, setCategories] = React.useState([
        "webDesign",
        "programming",
    ])
    const handleSetCategory = cat => setCategories(cat)

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
                        // b          ackgroundColor: "rgba(232,232,232,0.05)",
                        fontFamily: "PT Sans Narrow",
                        fontSize: "2.2rem",
                        color: theme.typography.h1.color,
                        padding: "1.5rem 0",
                        marginTop: "0",
                        textTransform: "uppercase",
                        letterSpacing: "0.2rem",
                    }}
                >
                    {intl.formatMessage({
                        id: `blogRollHeader`,
                    })}
                </h1>

                <Grid container spacing={adaptiveSpacing}>
                    <Grid component="section" item xs={12} md={8}>
                        <BlogRoll categories={categories} />
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
                        <AllCategoriesList setCategory={handleSetCategory} />
                        <LatestPosts />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
export default injectIntl(BlogIndexPage)
