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

import PreviewCompatibleImage from "./PreviewCompatibleImage"
import SvgCompatibleBackgroundImage from "../components/SvgCompatibleBackgroundImage"
const _ = require("lodash")

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "rgba(0, 20, 30)",
        // maxWidth: "380px",
        // margin: "0 auto",
        // border: "7px solid rgba(255,255,255,0.6)",
        outline: "1px solid #777",
        transition: "box-shadow 300ms linear",
        "&:hover": {
            // boxShadow: "0px 0px 4px 4px #fff2",
        },
    },

    cardMedia: {
        height: 150,
        [theme.breakpoints.up("sm")]: {
            height: 200,
        },
        border: "5px solid rgba(0, 20, 30)",
    },
    cardContent: {
        minHeight: 250,
        // backgroundColor: "rgba(0, 20, 30)",
        color: "#eeea",
        // backgroundImage: "url(/img/wavybg.svg)",
        // backgroundSize: "cover",
        "& p": {
            textIndent: "3em",
            // textAlign: "justify",
        },
    },
    cardHeader: {
        // fontFamily: "PT Sans, sans-serif",
        fontWeight: "700",
        textTransform: "uppercase",
        // marginTop: "-2.5em",
        // position: "absolute",
        // zIndex: "5000",
        textShadow: "0 0 10px #000",
    },
    cardHeaderLink: {
        textDecoration: "none",
    },
    cardMeta: {
        fontFamily: "PT Sans, sans-serif",
        fontWeight: "400",
        color: "#fff7",
        // color: "rgba(0,0,0,0.9)",
        textTransform: "uppercase",
        fontSize: "0.8rem",
        letterSpacing: "0.05em",
        padding: "0.6em 0 1.2em 0",
        "& span": {
            marginRight: "2em",
        },
    },
    cardMetaCategoryLink: {
        textDecoration: "none",
        color: theme.mainNavigationLinkColor,
        marginLeft: "0.7em",
        "&:hover": {
            color: theme.mainNavigationLinkActiveColor,
        },
    },
    cardActions: {
        // backgroundColor: "#777",
        border: "5px solid rgba(0, 20, 30)",
        borderTop: "1px solid #777",
        justifyContent: "center",
        "& span": {
            fontWeight: "bold",
            color: "#eee",
            textDecoration: "none",
        },
    },
    cardActionsLink: {
        textDecoration: "none",
        "& .MuiButton-label": {
            color: theme.mainNavigationLinkColor,
            "&:hover": {
                color: theme.mainNavigationLinkActiveColor,
            },
        },
    },
    rightArrow: {
        marginLeft: "-14px",
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

const BlogRoll = ({ intl }) => {
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

    return (
        <Grid
            container
            direction="column"
            spacing={theme.siteSpacing.aboutPage}
        >
            {posts &&
                posts.map(({ node: post }) => (
                    <Grid item key={post.id}>
                        <Card
                            className={`${classes.root}  ${
                                post.frontmatter.featuredpost
                                    ? "is-featured"
                                    : ""
                            }`}
                        >
                            <CardActionArea>
                                {post.frontmatter.featuredimage ? (
                                    <Link
                                        className={classes.cardHeaderLink}
                                        to={post.fields.slug}
                                    >
                                        <SvgCompatibleBackgroundImage
                                            image={
                                                post.frontmatter.featuredimage
                                            }
                                        >
                                            <section
                                                className={classes.cardMedia}
                                            ></section>
                                        </SvgCompatibleBackgroundImage>
                                    </Link>
                                ) : null}
                                <CardContent className={classes.cardContent}>
                                    <Link
                                        className={classes.cardHeaderLink}
                                        to={post.fields.slug}
                                    >
                                        <Typography
                                            className={classes.cardHeader}
                                            variant="h5"
                                            component="h2"
                                            // gutterBottom
                                        >
                                            {intl.formatMessage({
                                                id: `${post.id}.postTitle`,
                                            })}
                                        </Typography>
                                    </Link>
                                    <Typography
                                        component="section"
                                        className={classes.cardMeta}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        <span>
                                            {`${intl.formatMessage({
                                                id: "posted",
                                            })} :`}
                                            {post.frontmatter.date}
                                        </span>
                                        <span>
                                            {`${intl.formatMessage({
                                                id: "category",
                                            })}: `}
                                            <Link
                                                to={`/blog/categories/${_.toLower(
                                                    _.trim(
                                                        post.frontmatter
                                                            .postCategory
                                                    )
                                                )}`}
                                                className={
                                                    classes.cardMetaCategoryLink
                                                }
                                            >
                                                <span>{` ${
                                                    post.frontmatter
                                                        .postCategory
                                                        ? intl.formatMessage({
                                                              id:
                                                                  post
                                                                      .frontmatter
                                                                      .postCategory,
                                                          })
                                                        : intl.formatMessage({
                                                              id: "nocategory",
                                                          })
                                                }`}</span>
                                            </Link>
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        // color="textSecondary"
                                        component="p"
                                    >
                                        {`${intl.formatMessage({
                                            id: `${post.id}.postDescription`,
                                        })} `}{" "}
                                        Повседневная практика показывает, что
                                        реализация намеченных плановых заданий в
                                        значительной степени обуславливает
                                        создание соответствующий условий
                                        активизации. Не следует, однако
                                        забывать, что постоянное
                                        информационно-пропагандистское
                                        обеспечение нашей деятельности в
                                        значительной степени обуславливает
                                        создание системы обучения кадров,
                                        соответствует насущным потребностям.
                                        Товарищи! дальнейшее развитие различных
                                        форм деятельности играет важную роль в
                                        формировании новых предложений.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Link
                                className={classes.cardActionsLink}
                                to={post.fields.slug}
                            >
                                <CardActions className={classes.cardActions}>
                                    <Button>
                                        {/* <Button size="small" color="primary"> */}
                                        Читать статью <ChevronRightRounded />
                                        <ChevronRightRounded
                                            className={classes.rightArrow}
                                        />
                                    </Button>
                                </CardActions>
                            </Link>
                        </Card>
                    </Grid>
                ))}
        </Grid>
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
