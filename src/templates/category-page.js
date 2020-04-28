import React from "react"
import Helmet from "react-helmet"

import { graphql } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded"
import SvgCompatibleBackgroundImage from "../components/SvgCompatibleBackgroundImage"

import Layout from "../components/Layout"

const useStyles = makeStyles(theme => ({
    container: {
        outline: theme.mainNavigationBorderBottom,
        marginTop: `${theme.siteSpacing.aboutPage * 8}px`,
        marginBottom: `${theme.siteSpacing.aboutPage * 8}px`,
        // backgroundColor: "rgba(255,200,200,0.1)",
    },
    link: {
        ...theme.typography.button,
        backgroundColor: "teal",
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1.1),
        paddingBottom: theme.spacing(1.1),
        textDecoration: "none",
        color: "white",
    },

    // ----------------------------

    root: {
        backgroundColor: "rgba(0, 20, 30)",
        maxWidth: "380px",
        margin: "0 auto",
        // border: "7px solid rgba(255,255,255,0.6)",
        outline: "1px solid #777",
        transition: "box-shadow 300ms linear",
        "&:hover": {
            boxShadow: "0px 0px 4px 4px #fff2",
        },
    },
    cardMedia: {
        height: 200,
        border: "5px solid rgba(0, 20, 30)",
    },
    cardContent: {
        height: 250,
        // backgroundColor: "rgba(0, 20, 30)",
        color: "#eeea",
        // backgroundImage: "url(/img/wavybg.svg)",
        // backgroundSize: "cover",
    },
    cardActions: {
        backgroundColor: "#777",
        border: "5px solid rgba(0, 20, 30)",
        justifyContent: "center",
        "& span": {
            fontWeight: "bold",
            color: "#eee",
        },
    },
    headerLink: {
        textDecoration: "none",
    },
    rightArrow: {
        marginLeft: "-19px",
    },
    test: {
        color: "#eeea",
        fontWeight: 400,
    },
}))

const CategoryPage = props => {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                component="section"
                className={classes.container}
            >
                <Grid
                    container
                    direction="column"
                    spacing={theme.siteSpacing.aboutPage}
                    className={classes.zero}
                >
                    <Grid item>
                        <Typography
                            style={{
                                marginTop: "1.5rem",
                            }}
                            align="center"
                            variant="h4"
                            component="h2"
                            // gutterBottom
                        >
                            Категория{" "}
                            {props.intl.formatMessage({
                                id: `${props.pageContext.category}`,
                            })}
                        </Typography>
                        <Typography
                            className={classes.test}
                            align="center"
                            variant="h6"
                            component="h3"
                            // gutterBottom
                            style={{
                                marginBottom: "3.2rem",
                            }}
                        >
                            ( количество статей -{" "}
                            {props.data.allMarkdownRemark.totalCount} )
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={theme.siteSpacing.aboutPage}>
                            {props.data.allMarkdownRemark.edges.map(edge => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    key={edge.node.id}
                                >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <SvgCompatibleBackgroundImage
                                                image={
                                                    edge.node.frontmatter
                                                        .featuredimage
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.cardMedia
                                                    }
                                                ></div>
                                            </SvgCompatibleBackgroundImage>
                                            {/* <CardMedia
                                                className={classes.media}
                                                // image="/static/images/cards/contemplative-reptile.jpg"
                                                image={
                                                    edge.node.frontmatter
                                                        .featuredimage
                                                        .childImageSharp.fluid
                                                        .src
                                                }
                                                title="Contemplative Reptile"
                                            /> */}
                                            <CardContent
                                                className={classes.cardContent}
                                            >
                                                <Typography
                                                    align="center"
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {props.intl.formatMessage({
                                                        id: `${edge.node.id}.postTitle`,
                                                    })}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    // color="textSecondary"
                                                    component="p"
                                                >
                                                    {props.intl.formatMessage({
                                                        id: `${edge.node.id}.postDescription`,
                                                    })}{" "}
                                                    Lorem ipsum dolor sit amet
                                                    consec tetur adipisicing
                                                    elit. Dolorum, et nobis
                                                    commodi est explicabo
                                                    aliquam perspiciatis vel
                                                    sequi quae enim quos
                                                    corrupti, unde officia
                                                    necessitatibus quod in eius,
                                                    tenetur soluta.
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <Link
                                            className={classes.headerLink}
                                            to={edge.node.fields.slug}
                                        >
                                            <CardActions
                                                className={classes.cardActions}
                                            >
                                                <Button>
                                                    {/* <Button size="small" color="primary"> */}
                                                    Читать статью{" "}
                                                    <ChevronRightRounded />
                                                    <ChevronRightRounded
                                                        className={
                                                            classes.rightArrow
                                                        }
                                                    />
                                                </Button>
                                            </CardActions>
                                        </Link>
                                    </Card>

                                    <div>
                                        description:{" "}
                                        {props.intl.formatMessage({
                                            id: `${edge.node.id}.postDescription`,
                                        })}
                                    </div>
                                    <div>
                                        date: {edge.node.frontmatter.date}
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Link to="/blog/categories/" className={classes.link}>
                            All categories
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default injectIntl(CategoryPage)

export const categoryPageQuery = graphql`
    query categoryByPostCategory($category: String!) {
        allMarkdownRemark(
            filter: { frontmatter: { postCategory: { eq: $category } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                        featuredpost
                        featuredimage {
                            childImageSharp {
                                fluid(maxWidth: 400, quality: 80) {
                                    srcSet
                                    src
                                }
                            }
                            publicURL
                        }
                    }
                }
            }
            totalCount
        }
    }
`
