import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    link: {
        color: "tomato",
        textDecoration: "none",
        "& span": {
            color: "#eee7",
            fontWeight: "normal",
            fontSize: "1rem",
        },
    },

    blurred: {
        color: "#eee7",
        fontWeight: "normal",
        fontSize: "1rem",
    },
}))

const AllCategoriesList = ({ intl }) => {
    const qdata = useStaticQuery(graphql`
        query AllCategoriesListQuery {
            allMarkdownRemark(
                filter: {
                    frontmatter: { templateKey: { eq: "category-page" } }
                }
                sort: { fields: frontmatter___categoryId, order: DESC }
            ) {
                totalCount
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            categoryId
                        }
                    }
                }
            }
        }
    `)

    const { edges: categories } = qdata.allMarkdownRemark

    const classes = useStyles()
    const theme = useTheme()

    return (
        <div>
            <h3>
                {intl.formatMessage({
                    id: `allcategories`,
                })}{" "}
                <Link to="/blog/categories/" className={classes.link}>
                    <span className={classes.blurred}>
                        ( {qdata.allMarkdownRemark.totalCount} )
                    </span>
                </Link>
            </h3>
            {categories &&
                categories.map(({ node: category }) => (
                    <div key={category.id}>
                        <Link
                            to={category.fields.slug}
                            className={classes.link}
                        >
                            {intl.formatMessage({
                                id: `${category.frontmatter.categoryId}`,
                            })}
                        </Link>
                    </div>
                ))}
        </div>
    )
}
export default injectIntl(AllCategoriesList)
// {category.fields.slug}
