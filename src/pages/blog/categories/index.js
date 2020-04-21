import React from "react"

import { injectIntl } from "gatsby-plugin-intl"

import Container from "@material-ui/core/Container"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Layout from "../../../components/Layout"

const useStyles = makeStyles(theme => ({
    test: {
        color: "tomato",
    },
}))

const CategoriesPage = ({
    intl,
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
                <div className={classes.test}>All categories</div>
                {group.map(category => (
                    <div className={classes.test} key={category.fieldValue}>
                        {intl.formatMessage({
                            id: `${category.fieldValue}`,
                        })}{" "}
                        - {category.totalCount} статья
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
        ) {
            group(field: frontmatter___categoryId) {
                totalCount
                fieldValue
            }
        }
    }
`
