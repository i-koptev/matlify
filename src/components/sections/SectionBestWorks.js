import React, { useEffect } from "react"
import clsx from "clsx"

import { injectIntl, Link } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Observer from "@researchgate/react-intersection-observer"

import gsap, { Power1, Power2, Power3, Power4 } from "gsap"

import SvgCompatibleBackgroundImage from "../../components/SvgCompatibleBackgroundImage"
import useMediaQuery from "@material-ui/core/useMediaQuery"

// font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "rgba(255, 191, 85)",
        paddingTop: "2rem",
    },
    bgImageTextRight: {
        backgroundColor: "rgba(255, 191, 85)",
        backgroundImage:
            "linear-gradient(0deg, rgba(20,46,57,1) 31%, rgba(20,46,57,1) 70%, rgba(255, 191, 85) 70%)",
        [theme.breakpoints.up("md")]: {
            backgroundImage:
                " linear-gradient(0deg, rgba(255, 191, 85) 25%, rgba(20,46,57,1) 25%, rgba(20,46,57,1) 75%, rgba(255, 191, 85) 75%)",
        },
        [theme.breakpoints.up("lg")]: {
            backgroundImage:
                "linear-gradient(90deg, rgba(20,46,57,0) 90%, rgba(255, 191, 85) 90%), linear-gradient(0deg, rgba(255, 191, 85) 25%, rgba(20,46,57,1) 25%, rgba(20,46,57,1) 75%, rgba(255, 191, 85) 75%)",
        },
    },
    bgImageTextLeft: {
        backgroundColor: "rgba(255, 191, 85)",
        backgroundImage:
            "linear-gradient(0deg, rgba(20,46,57,1) 31%, rgba(20,46,57,1) 70%, rgba(255, 191, 85) 70%)",
        [theme.breakpoints.up("md")]: {
            backgroundImage:
                " linear-gradient(0deg, rgba(255, 191, 85) 25%, rgba(20,46,57,1) 25%, rgba(20,46,57,1) 75%, rgba(255, 191, 85) 75%)",
        },
        [theme.breakpoints.up("lg")]: {
            backgroundImage:
                "linear-gradient(90deg, rgba(255, 191, 85) 10%, rgba(20,46,57,0) 10%), linear-gradient(0deg, rgba(255, 191, 85) 25%, rgba(20,46,57,1) 25%, rgba(20,46,57,1) 75%, rgba(255, 191, 85) 75%)",
        },
    },
    imageWrapper: {
        opacity: 0,
        height: "250px",
        paddingTop: "1rem",
        // width: "400px",
        width: "100%",
        // backgroundColor: "#999",
        [theme.breakpoints.up("md")]: {
            height: "350px",
            padding: "2rem", // размер картинки
        },
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundImage:
            "url('/static/3e6b48bc689b498736a78f16558e993e/c26dd/blog-index.jpg')",
        backgroundSize: "cover",
        boxShadow: "0px 0 21px 1px #000000a6",
    },
    textWrapper: {
        width: "100%",
        color: "#eee",
        padding: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    },
    header: {
        // marginTop: "-3.4rem",
        marginBottom: "-0.9rem",
        margin: 0,
        fontFamily: "Playfair Display",
        fontSize: "48px",
        color: "rgba(20,46,57)",
        letterSpacing: "0.2rem",
        [theme.breakpoints.down("md")]: {
            fontSize: "42px",
            letterSpacing: "0.1rem",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "32px",
            color: "rgba(255, 191, 85)",
            paddingTop: "0.7rem",
        },
    },
    headerToLeft: {
        marginRight: "auto",
        [theme.breakpoints.down("sm")]: {
            margin: "auto",
        },
    },
    headerToRight: {
        marginLeft: "auto",
        [theme.breakpoints.down("sm")]: {
            margin: "auto",
        },
    },

    headerRow: {
        flex: 1,
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    textRow: {
        flex: 2,
    },
    underlyingRow: {
        flex: 1,
    },
    zeroMarginTopBottom: {
        marginTop: 0,
        marginBottom: 0,
    },
}))
const data = [
    {
        header: "Сайт компании",
        text:
            "Таким образом укрепление и развитие структуры позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности способствует подготовки и реализации модели развития.",
    },
    {
        header: "Личный блог",
        text:
            "Таким образом укрепление и развитие структуры позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности способствует подготовки и реализации модели развития.",
    },
    {
        header: "Дизайн коробки",
        text:
            "Таким образом укрепление и развитие структуры позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности способствует подготовки и реализации модели развития.",
    },
]

const WorkItem = props => {
    const classes = useStyles()
    const theme = useTheme()

    const handleImageEmergeFromBottom = (event, unobserve) => {
        if (event.isIntersecting) {
            gsap.fromTo(
                event.target,
                {
                    y: 20,
                    ease: Power4,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                }
            )

            unobserve()
        }
    }

    const handleImageEmergeFromLeft = (event, unobserve) => {
        if (event.isIntersecting) {
            gsap.fromTo(
                event.target,
                {
                    x: -30,
                    ease: Power4,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                }
            )

            unobserve()
        }
    }
    const handleImageEmergeFromRight = (event, unobserve) => {
        if (event.isIntersecting) {
            gsap.fromTo(
                event.target,
                {
                    x: 30,
                    ease: Power4,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                }
            )

            unobserve()
        }
    }

    const small = useMediaQuery(theme.breakpoints.down("sm"))
    const index = !(props.index % 2)
    return (
        <div
            className={
                index || small
                    ? classes.bgImageTextRight
                    : classes.bgImageTextLeft
            }
        >
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                component="section"
            >
                <Grid
                    container
                    spacing={0}
                    // className={clsx(classes.zeroMarginTopBottom)}
                    justify="center"
                >
                    {index || small ? (
                        <Grid item xs={12} sm={10} md={6} lg={5}>
                            <Observer
                                onChange={
                                    small
                                        ? handleImageEmergeFromBottom
                                        : handleImageEmergeFromLeft
                                }
                                threshold="0.7"
                                // threshold={thresholds}
                            >
                                <div className={classes.imageWrapper}>
                                    <div className={classes.image}></div>
                                </div>
                            </Observer>
                        </Grid>
                    ) : (
                        ""
                    )}
                    <Grid
                        item
                        container
                        direction="column"
                        alignItems="stretch"
                        spacing={0}
                        xs={12}
                        sm={10}
                        md={6}
                        lg={5}
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            // alignItems="flex-end"
                            alignContent="flex-end"
                            // justify="flex-end"
                            className={classes.headerRow}
                        >
                            <h2
                                className={clsx(
                                    classes.header,
                                    index || small
                                        ? classes.headerToLeft
                                        : classes.headerToRight
                                )}
                            >
                                {props.header}
                            </h2>
                        </Grid>
                        <Grid item className={classes.textRow}>
                            <div className={classes.textWrapper}>
                                <p>{props.text}</p>
                            </div>
                        </Grid>
                        <Grid item className={classes.underlyingRow}></Grid>
                    </Grid>
                    {index || small ? (
                        ""
                    ) : (
                        <Grid item xs={12} sm={10} md={6} lg={5}>
                            <Observer
                                onChange={
                                    small
                                        ? handleImageEmergeFromBottom
                                        : handleImageEmergeFromRight
                                }
                                threshold="0.7"
                                // threshold={thresholds}
                            >
                                <div className={classes.imageWrapper}>
                                    <div className={classes.image}></div>
                                </div>
                            </Observer>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    )
}

const SectionBestWorks = () => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={classes.root}>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                component="section"
            >
                <Grid
                    container
                    spacing={0}
                    // className={clsx(classes.zeroMarginTopBottom)}
                    // justify="center"
                >
                    <Typography
                        variant="h5"
                        style={{
                            color: "#333",
                            paddingBottom: "1.5rem",
                            paddingLeft: "11vw",
                            fontFamily: "PT Sans Narrow",
                            textTransform: "uppercase",
                            letterSpacing: ".1rem",
                        }}
                    >
                        Лучшие работы
                    </Typography>
                </Grid>
            </Container>

            {data.map((item, i) => (
                <WorkItem
                    index={i}
                    header={item.header}
                    text={item.text}
                    key={i}
                />
            ))}
        </div>
    )
}

export default SectionBestWorks
