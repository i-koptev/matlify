import React from "react"
import { graphql } from "gatsby"

import { injectIntl, Link } from "gatsby-plugin-intl"

import Container from "@material-ui/core/Container"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Layout from "../../../components/Layout"
const _ = require("lodash")

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: theme.mainNavigationLinkColor,
        "&:hover": {
            color: theme.mainNavigationLinkActiveColor,
        },
    },
    test: {
        color: "tomato",
    },
}))

const CategoriesPage = ({
    intl,
    data,
    data: {
        allMarkdownRemark: { group },
    },
}) => {
    const theme = useTheme()
    const classes = useStyles()
    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                // className="intro"
                // className={classes.section}
            >
                <h2 className={classes.test}>
                    {intl.formatMessage({
                        id: `allcategories`,
                    })}{" "}
                    ({data.allMarkdownRemark.totalCount})
                </h2>
                {group.map(category => (
                    <div className={classes.test} key={category.fieldValue}>
                        <Link
                            className={classes.link}
                            to={`/blog/categories/${_.toLower(
                                _.trim(category.fieldValue)
                            )}`}
                        >
                            {" "}
                            {intl.formatMessage({
                                id: `${category.fieldValue}`,
                            })}
                        </Link>
                    </div>
                ))}
            </Container>
        </Layout>
    )
}
export default injectIntl(CategoriesPage)

export const allCategoriesPageQuery = graphql`
    query AllCategoriesQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "category-page" } } }
            sort: { fields: frontmatter___categoryId, order: DESC }
        ) {
            group(field: frontmatter___categoryId) {
                fieldValue
            }
            totalCount
        }
    }
`
