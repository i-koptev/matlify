import React, { useEffect } from "react"

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
import SvgCompatibleBackgroundImage from "../../components/SvgCompatibleBackgroundImage"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "rgba(254,254,254)",
        // backgroundColor: "white",
        paddingTop: "2rem",
        paddingBottom: "2.5rem",
        marginTop: 0,
        marginBottom: 0,
    },
    container: {
        // backgroundColor: "darkblue",
    },
    gridContainer: {
        // minHeight: "80vh",
        // paddingTop: "1rem",
        // paddingBottom: "calc(3rem - 6 * 4px)",
    },
    cardRoot: {
        color: "transparent",
        // backgroundColor: "rgba(0, 20, 30)",
        // maxWidth: "380px",
        margin: "0 auto",
        boxShadow: "none",
        // border: "7px solid rgba(255,255,255,0.6)",
        // outline: "1px solid #777",
        transition: "box-shadow 300ms linear",
        "&:hover": {
            // boxShadow: "0px 0px 20px 2px #ddd",
            // backgroundColor: "red",
        },
        "& .MuiButtonBase-root": {
            cursor: "default",
        },
    },
    cardMedia: {
        height: 180,
        // border: "5px solid rgba(0, 20, 30)",
        backgroundColor: "rgba(0, 20, 30)",
        backgroundImage:
            "url('/static/3e6b48bc689b498736a78f16558e993e/c26dd/blog-index.jpg')",
        backgroundSize: "cover",
    },
    cardHeader: {
        paddingTop: "5rem",
        paddingBottom: "1.7rem",
        color: "black",
        textTransform: "uppercase",
        fontFamily: "PT Sans Narrow",
        fontSize: "1.5rem",
        "&::before": {
            height: "22px",
            width: "22px",
            content: '""',
            position: "absolute",
            left: "calc(50% - 0.7em)",
            top: "2.7rem",
            // margin: 0 auto;
            backgroundColor: "#ffbf55", //TODO change to theme
            display: "block",
            transform: "rotate(45deg)",
        },
    },
    cardContent: {
        minHeight: 150,
        margin: 0,
        padding: 0,
        paddingTop: "2rem",
        // backgroundColor: "rgba(0, 20, 30)",
        color: "#333",
        fontFamily: "Roboto !important",
        // backgroundImage: "url(/img/wavybg.svg)",
        // backgroundSize: "cover",
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

const SectionAdvantages = () => {
    const classes = useStyles()
    const theme = useTheme()
    return (
        <div className={classes.root}>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                className={classes.container}
            >
                <Grid
                    container
                    spacing={7}
                    justify="center"
                    alignContent="center"
                    className={classes.gridContainer}
                >
                    <Grid item xs={12} sm={8} md={5} lg={5}>
                        <Card className={classes.cardRoot}>
                            <CardActionArea>
                                {/* <SvgCompatibleBackgroundImage
                                    image={edge.node.frontmatter.featuredimage}
                                > */}
                                <Typography
                                    className={classes.cardHeader}
                                    align="center"
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                >
                                    Скорость
                                </Typography>
                                <div className={classes.cardMedia}></div>
                                {/* </SvgCompatibleBackgroundImage> */}
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
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        variant="body2"
                                        // color="textSecondary"
                                        component="p"
                                    >
                                        Lorem ipsum dolor sit amet consec tetur
                                        adipisicing elit. Dolorum, et nobis
                                        commodi est explicabo aliquam
                                        perspiciatis vel sequi quae enim quos
                                        corrupti, unde officia necessitatibus
                                        quod in eius, tenetur soluta. Lorem
                                        ipsum dolor sit amet consectetur
                                        adipisicing elit. Cupiditate sunt, sit
                                        inventore tempora obcaecati, commodi
                                        iure quam asperiores quos totam sint
                                        cumque sequi debitis tempore illo ea.
                                        Laboriosam, officiis non?
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        // color="textSecondary"
                                        component="p"
                                    >
                                        Lorem ipsum dolor sit amet consec tetur
                                        adipisicing elit. Dolorum, et nobis
                                        commodi est explicabo aliquam
                                        perspiciatis vel sequi quae enim quos
                                        corrupti, unde officia necessitatibus
                                        quod in eius, tenetur soluta. Lorem
                                        ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={5}>
                        <Card className={classes.cardRoot}>
                            <CardActionArea>
                                {/* <SvgCompatibleBackgroundImage
                                    image={edge.node.frontmatter.featuredimage}
                                > */}
                                <Typography
                                    className={classes.cardHeader}
                                    align="center"
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                >
                                    Качество
                                </Typography>
                                <div className={classes.cardMedia}></div>
                                {/* </SvgCompatibleBackgroundImage> */}
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
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        variant="body2"
                                        // color="textSecondary"
                                        component="p"
                                    >
                                        Lorem ipsum dolor sit amet consec tetur
                                        adipisicing elit. Dolorum, et nobis
                                        commodi est explicabo aliquam
                                        perspiciatis vel sequi quae enim quos
                                        corrupti, unde officia necessitatibus
                                        quod in eius, tenetur soluta.
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        // color="textSecondary"
                                        component="p"
                                    >
                                        Lorem ipsum dolor sit amet consec tetur
                                        adipisicing elit. Dolorum, et nobis
                                        commodi est explicabo aliquam
                                        perspiciatis vel sequi quae enim quos
                                        corrupti, unde officia necessitatibus
                                        quod in eius, tenetur soluta. Lorem
                                        ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default SectionAdvantages
