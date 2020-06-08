import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    link: {
        color: "#E0DEDE",
        textDecoration: "none",
        "& span": {
            color: "rgba(170, 166, 166, 1)",
            fontWeight: "normal",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
        },
    },
}))

const AllCategoriesList = ({ intl, setCategory }) => {
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

    const allCategories = []
    categories.map(item => allCategories.push(item.node.frontmatter.categoryId))

    return (
        <div>
            <h2
                style={{
                    fontFamily: "PT Sans Narrow",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textTransform: "uppercase",
                    color: theme.typography.h2.color,
                    marginTop: "1.5rem",
                    letterSpacing: "0.15em",
                    cursor: "pointer",
                }}
                onClick={() => setCategory(allCategories)}
            >
                {intl.formatMessage({
                    id: `allcategories`,
                })}{" "}
                <Link to="/blog/categories/" className={classes.link}>
                    <span>( {qdata.allMarkdownRemark.totalCount} )</span>
                </Link>
            </h2>
            {categories &&
                categories.map(({ node: category }) => (
                    <div
                        key={category.id}
                        style={{
                            fontFamily: "PT Sans Narrow",
                            fontWeight: "400",
                            fontSize: "1.15rem",
                            letterSpacing: "0.1em",
                            marginTop: 0,
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            setCategory([category.frontmatter.categoryId])
                        }
                    >
                        {/* <Link
                            to={category.fields.slug}
                            className={classes.link}
                            style={{
                                fontFamily: "PT Sans",
                                fontWeight: "400",
                                fontSize: "1.1rem",
                                letterSpacing: "0.1em",
                                marginTop: 0,
                            }}
                        > */}
                        {intl.formatMessage({
                            id: `${category.frontmatter.categoryId}`,
                        })}
                        {/* </Link> */}
                    </div>
                ))}
        </div>
    )
}
export default injectIntl(AllCategoriesList)
// {category.fields.slug}
