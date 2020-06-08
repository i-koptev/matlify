import React from "react"
import { graphql, useStaticQuery } from "gatsby"
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
import { CSSTransitionGroup } from "react-transition-group"
import "./test.css"

import PreviewCompatibleImage from "./PreviewCompatibleImage"
import SvgCompatibleBackgroundImage from "../components/SvgCompatibleBackgroundImage"
import SvgCompatibleImage from "../components/SvgCompatibleImage"
const _ = require("lodash")

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: "0 0 13px 1px #ffffff25",
        marginBottom: "2rem",
        // backgroundColor: "rgba(0, 20, 30)",
        // maxWidth: "380px",
        // margin: "0 auto",
        // // border: "7px solid rgba(255,255,255,0.6)",
        // outline: "1px solid #777",
        transition: "box-shadow 200ms linear",
        "&:hover": {
            boxShadow: "0px 0px 6px 1px #fff2",
        },
    },
    imageBoxWrapper: {
        overflow: "hidden", // image grow on hover inside the card
    },
    imageBox: {
        minHeight: 200,
        transform: "scale(1.1)",
        [theme.breakpoints.up("md")]: {
            height: "100%",
        },
        transition: "transform 2000ms linear",
        "&:hover": {
            transform: "scale(1)",
        },
    },
    textBox: {
        backgroundColor: theme.sections.blogRoll.postCardBackground,
        color: theme.sections.blogRoll.postCardTextColor,
        padding: 40,
        paddingTop: 20,
        paddingBottom: 20,
        minHeight: 200,
    },
    textBoxMeta: {
        fontFamily: "PT Sans, sans-serif",
        fontWeight: "400",
        color: "#fff7",
        // color: "rgba(0,0,0,0.9)",
        textTransform: "uppercase",
        fontSize: "0.74rem",
        letterSpacing: "0.05em",
        padding: "0.6em 0 1.2em 0",
    },
    textBoxMetaCategory: {
        paddingBottom: 3,
        marginBottom: 7,
        borderBottom: `1px solid ${theme.mainNavigationLinkColor}`,
    },
    textBoxMetaCategoryText: {
        fontSize: "0.74rem",
        letterSpacing: "0.07em",
        textTransform: "lowercase",
        color: theme.mainNavigationLinkColor,
        // color: "rgba(226, 222, 222, 1)",
    },
    textBoxMetaCategoryDataLink: {
        fontSize: "0.84rem",
        fontWeight: "bold",
        letterSpacing: "0.165rem",
        textDecoration: "none",
        color: theme.mainNavigationLinkColor,
        marginLeft: "0.7rem",
        "&:hover": {
            color: theme.mainNavigationLinkActiveColor,
        },
    },
    textBoxMetaDateText: {
        fontSize: "0.74rem",
        letterSpacing: "0.07em",
        textTransform: "lowercase",
        color: theme.mainNavigationLinkColor,
    },
    textBoxMetaDateData: {
        fontSize: "0.84rem",
        fontWeight: "bold",
        // letterSpacing: "0.09em",
        textDecoration: "none",
        color: theme.mainNavigationLinkColor,
        marginLeft: "0.7rem",
    },
    textBoxHeader: {
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: "1.7rem",
        letterSpacing: "0.2rem",
    },
    textBoxHeaderLink: { textDecoration: "none" },
    textBoxText: {
        lineHeight: "192.4%",
        textIndent: "2em",
    },
    textBoxButton: {
        padding: "0.5em 1em 0.5em 2em",
        fontSize: "0.7rem",
        border: `1px solid ${theme.mainNavigationLinkColor}`,
        marginTop: "1rem",
        color: theme.mainNavigationLinkColor,
    },

    leftArrow: {
        height: "15px",
    },
    rightArrow: {
        marginLeft: "-17px",
        height: "15px",
    },

    test: {
        flexGrow: 1,
        [theme.breakpoints.down("sm")]: {
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up("md")]: {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up("lg")]: {
            backgroundColor: theme.palette.primary.ikky,
        },
    },
}))

const BlogRoll = ({ categories, intl }) => {
    const qdata = useStaticQuery(graphql`
        query BlogRollQuery {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {
                    frontmatter: {
                        templateKey: { in: ["blog-post", "illustrated-post"] }
                    }
                }
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 400)
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            categoryId
                            postCategory
                            title
                            templateKey
                            date(formatString: "DD. MM. YYYY")
                            featuredpost
                            featuredimage {
                                childImageSharp {
                                    fluid(maxWidth: 800, quality: 100) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                                publicURL
                            }
                        }
                    }
                }
            }
        }
    `)
    const { edges: posts } = qdata.allMarkdownRemark

    const classes = useStyles()
    const theme = useTheme()
    // const categories = props.categories
    // const categories = ["webDesign"]

    return (
        <div>
            <Grid
                container
                direction="column"
                wrap="nowrap"
                // spacing={theme.siteSpacing.aboutPage}
            >
                <CSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {/* {posts.filter(
                    post => post.node.frontmatter.postCategory === "webDesign"
                )} */}

                    {posts &&
                        posts
                            .filter(post =>
                                categories.includes(
                                    post.node.frontmatter.postCategory
                                )
                            )
                            .map(({ node: post }) => (
                                <Grid
                                    item
                                    key={post.id}
                                    className={classes.root}
                                >
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            lg={5}
                                            className={classes.imageBoxWrapper}
                                        >
                                            {post.frontmatter.featuredimage ? (
                                                <Link to={post.fields.slug}>
                                                    <div
                                                        className={
                                                            classes.imageBox
                                                        }
                                                    >
                                                        <SvgCompatibleImage
                                                            image={
                                                                post.frontmatter
                                                                    .featuredimage
                                                            }
                                                        ></SvgCompatibleImage>
                                                    </div>
                                                </Link>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} lg={7}>
                                            <Grid
                                                container
                                                direction="column"
                                                justify="space-between"
                                                wrap="nowrap"
                                                className={classes.textBox}
                                            >
                                                <Grid item>
                                                    <Typography
                                                        component="section"
                                                        className={
                                                            classes.textBoxMeta
                                                        }
                                                        // variant="subtitle2"
                                                        gutterBottom
                                                    >
                                                        <div
                                                            className={
                                                                classes.textBoxMetaCategory
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    classes.textBoxMetaCategoryText
                                                                }
                                                            >
                                                                {`${intl.formatMessage(
                                                                    {
                                                                        id:
                                                                            "category",
                                                                    }
                                                                )}: `}
                                                            </span>
                                                            <Link
                                                                to={`/blog/categories/${_.toLower(
                                                                    _.trim(
                                                                        post
                                                                            .frontmatter
                                                                            .postCategory
                                                                    )
                                                                )}`}
                                                                className={
                                                                    classes.textBoxMetaCategoryDataLink
                                                                }
                                                            >
                                                                {` ${
                                                                    post
                                                                        .frontmatter
                                                                        .postCategory
                                                                        ? intl.formatMessage(
                                                                              {
                                                                                  id:
                                                                                      post
                                                                                          .frontmatter
                                                                                          .postCategory,
                                                                              }
                                                                          )
                                                                        : intl.formatMessage(
                                                                              {
                                                                                  id:
                                                                                      "nocategory",
                                                                              }
                                                                          )
                                                                }`}
                                                            </Link>
                                                        </div>
                                                        {/* дата публикации */}
                                                        <span
                                                            className={
                                                                classes.textBoxMetaDateText
                                                            }
                                                        >
                                                            {`${intl.formatMessage(
                                                                {
                                                                    id:
                                                                        "posted",
                                                                }
                                                            )} :`}
                                                        </span>
                                                        <span
                                                            className={
                                                                classes.textBoxMetaDateData
                                                            }
                                                        >
                                                            {
                                                                post.frontmatter
                                                                    .date
                                                            }
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Link
                                                        className={
                                                            classes.textBoxHeaderLink
                                                        }
                                                        to={post.fields.slug}
                                                    >
                                                        <Typography
                                                            className={
                                                                classes.textBoxHeader
                                                            }
                                                            variant="h5"
                                                            component="h2"
                                                            // gutterBottom
                                                        >
                                                            {intl.formatMessage(
                                                                {
                                                                    id: `${post.id}.postTitle`,
                                                                }
                                                            )}
                                                        </Typography>
                                                    </Link>
                                                    <Typography
                                                        variant="body2"
                                                        // color="textSecondary"
                                                        component="p"
                                                        className={
                                                            classes.textBoxText
                                                        }
                                                    >
                                                        {`${intl.formatMessage({
                                                            id: `${post.id}.postDescription`,
                                                        })} `}
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Exercitationem a non
                                                        dolorem nam illum,
                                                        soluta quidem id nemo,
                                                        totam hic voluptate
                                                        debitis similique, magni
                                                        praesentium, magni
                                                        adipisci laboriosam.
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    container
                                                    justify="flex-end"
                                                    alignItems="flex-end"
                                                >
                                                    <Link
                                                        className={
                                                            classes.textBoxHeaderLink
                                                        }
                                                        to={post.fields.slug}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            className={
                                                                classes.textBoxButton
                                                            }
                                                        >
                                                            Читать статью{" "}
                                                            <ChevronRightRounded
                                                                className={
                                                                    classes.leftArrow
                                                                }
                                                            />
                                                            <ChevronRightRounded
                                                                className={
                                                                    classes.rightArrow
                                                                }
                                                            />
                                                        </Button>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                </CSSTransitionGroup>
            </Grid>
        </div>
    )
}
/* 
BlogRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}
 */
export default injectIntl(BlogRoll)
