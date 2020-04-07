import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { useTransition, useSpring, animated } from "react-spring"

import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import Lottie from "react-lottie"
import * as animation from "../animations/hero/data"

import Button from "../components/ButtonYellow"
import SvgCompatibleBackgroundImage from "../components/SvgCompatibleBackgroundImage"

const useStyles = makeStyles(theme => ({
    firstletter: {
        fill: "red",
    },
    hero: {
        [theme.breakpoints.up("md")]: {
            minHeight: "calc(100vh - 64px)",
        },

        position: "relative",
        minHeight: "calc(80vh - 64px)",
        // height: "calc(100vh - 64px)",
        // minHeight: "400px",

        // backgroundImage: `url(${wavybg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        /* background: #0c0808; */
        backgroundImage:
            "linear-gradient(to top,rgba(0, 20, 30, 0),rgba(0, 20, 30, 0.2))",
        /* opacity: 0.9; */
        zIndex: "1",
        overflow: "hidden",
    },
    textbox: {
        // outline: "3px solid tomato",
        color: "white",
        paddingTop: "7vh",
        paddingBottom: "4vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        [theme.breakpoints.up("md")]: {
            paddingLeft: "4em",
        },
    },
    line: {
        ["@media (min-width:960px) and (orientation: landscape)"]: {
            // eslint-disable-line no-useless-computed-key
            // [theme.breakpoints.up('md')]: {
            "&::before": {
                height: "15em",
                content: '""',
                width: "1px",
                position: "absolute",
                left: "0",
                top: "9em",
                // margin: 0 auto;
                backgroundColor: "#ffbf55", //TODO change to theme
                display: "block",
                [theme.breakpoints.up("lg")]: {
                    height: "19em",
                },
                [theme.breakpoints.up("xl")]: {
                    height: "22em",
                },
            },
        },
    },
    title: {
        margin: "0",
        marginBottom: "0.5em",
        fontFamily: '"Playfair Display", serif',
        // text-align: center;
        color: "#edf3f7",
        letterSpacing: "0.06em",
        lineHeight: "1em",
        textAlign: "center",

        fontSize: "calc(1.75rem + 5.14286vmin)",
        [theme.breakpoints.up("md")]: {
            textAlign: "left",
            fontSize: "calc(1.9375rem + 7.07143vmin)", //130px
        },
        [theme.breakpoints.up("lg")]: {
            textAlign: "left",
            fontSize: "calc(2.125rem + 9vmin)",
        },
        // @include font-size(100px);
        // @include media-breakpoint-up(md) {
        //     text-align: left;
        //     @include font-size(130px);
        // }
        // @include media-breakpoint-up(lg) {
        //     text-align: left;
        //     @include font-size(160px);
        // }
    },
    slogan: {
        fontFamily: '"PT Sans Narrow", sans-serif',
        fontWeight: "normal",
        // fontFamily: '"Playfair Display", serif',
        color: "#ffbf55", //TODO change to theme
        fontSize: "1.25rem",

        // @include font-size(20px);
        // color: $theme-accent-color;
        marginLeft: "0.3em",
        marginBottom: "1em",
        textAlign: "center",
        letterSpacing: "0.15em",
        [theme.breakpoints.up("md")]: {
            textAlign: "left",
            fontSize: "calc(1.3125rem + 0.64286vmin)",
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: "1.875rem",
        },
    },
    features: {
        marginTop: "2em",
        fontFamily: '"PT Sans Narrow", sans-serif',
        fontWeight: "normal",
        letterSpacing: "0.11em",
        lineHeight: "2em",
        textAlign: "center",

        color: "#ffbf55", //TODO change to theme
        "& ul": {
            listStyle: "none",
            paddingLeft: "0",
        },
        fontSize: "1rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.0625rem",
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: "2em",
            textAlign: "left",

            fontSize: "1.125rem",
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: "1.25rem",
        },
    },
}))

const Hero = ({ intl }) => {
    const classes = useStyles()
    const theme = useTheme()

    const propsTitle = useSpring({
        from: { opacity: 0, transform: "translate3d(0, -5px, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        config: {
            delay: 500,
            duration: 500,
        },
    })

    const propsSlogan = useSpring({
        from: { opacity: 0, transform: "translate3d(0, -10px, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        config: {
            delay: 1000,
            duration: 700,
        },
    })

    const propsFeature1 = useSpring({
        from: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        delay: 300,
        config: {
            duration: 700,
        },
    })
    const propsFeature2 = useSpring({
        from: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        delay: 450,
        config: {
            duration: 700,
        },
    })

    const propsFeature3 = useSpring({
        from: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        delay: 600,
        config: {
            duration: 700,
        },
    })
    const propsFeature4 = useSpring({
        from: { opacity: 0, transform: "translate3d(-1000px, 0, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        delay: 750,
        config: {
            duration: 700,
        },
    })

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animation.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
        },
    }

    const data = useStaticQuery(graphql`
        query HeroSectionBackgroundImage {
            markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
                frontmatter {
                    indexSectionHero {
                        heroImage {
                            childImageSharp {
                                fluid(maxWidth: 1200, quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                            publicURL
                        }
                    }
                }
            }
        }
    `)
    const image = data.markdownRemark.frontmatter.indexSectionHero.heroImage

    return (
        <SvgCompatibleBackgroundImage image={image} className={classes.hero}>
            {/* <div
                className={classes.hero}
                style={{
                    // backgroundImage: `url("/static/wavybg-feb688c1c3f71c1dc387cdf172cece34.svg")`,
                    backgroundImage: `url(${data.markdownRemark.frontmatter.indexSectionHero.heroImage.publicURL})`,
                }}
            > */}
            {/* <BackgroundImage
            className={classes.hero}
            Tag="section"
            fluid={heroImage.childImageSharp.fluid}
            fadeIn="soft"
        > */}
            {/* <div className={classes.overlay}></div> */}

            <Container maxWidth={theme.siteContainer.maxWidth}>
                <Grid container className={classes.textbox} spacing={0}>
                    <Grid className={classes.line} item xs={12}>
                        <animated.h2
                            style={propsSlogan}
                            className={classes.slogan}
                        >
                            {intl.formatMessage({
                                id: `indexSectionHero.subheading`,
                            })}
                        </animated.h2>

                        <animated.h1
                            trail="5000"
                            style={propsTitle}
                            className={classes.title}
                        >
                            {intl.formatMessage({
                                id: `indexSectionHero.heading`,
                            })}
                        </animated.h1>
                        {/* 
                        <animated.h1
                            trail="5000"
                            style={propsTitle}
                            className={classes.title}
                        >
                            <Lottie options={defaultOptions} />
                        </animated.h1>
 */}
                        <Grid item container direction="row" spacing={3}>
                            <Grid item xs={12} md={5}>
                                <div className={classes.features}>
                                    <ul>
                                        <animated.li style={propsFeature1}>
                                            {intl.formatMessage({
                                                id: `indexSectionHero.features.feature1`,
                                            })}
                                        </animated.li>
                                        <animated.li style={propsFeature2}>
                                            {intl.formatMessage({
                                                id: `indexSectionHero.features.feature2`,
                                            })}
                                        </animated.li>
                                        <animated.li style={propsFeature3}>
                                            {intl.formatMessage({
                                                id: `indexSectionHero.features.feature3`,
                                            })}
                                        </animated.li>
                                        <animated.li style={propsFeature4}>
                                            {intl.formatMessage({
                                                id: `indexSectionHero.features.feature4`,
                                            })}
                                        </animated.li>
                                    </ul>
                                </div>

                                <Button
                                    style={{
                                        marginTop: "2rem",
                                        marginLeft: "2rem",
                                    }}
                                >
                                    Наши контакты
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={7}
                                style={{
                                    marginTop: "1rem",
                                    borderBottom:
                                        "3px solid rgba(128,128,128,0.1)",
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                    color: "rgba(255,255,255,0.7)",
                                }}
                            >
                                <h3>Разработка дизайна</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Enim ut mollitia ducimus,
                                    nesciunt sequi nam commodi perferendis unde
                                    deserunt! Unde ipsa voluptatem repudiandae
                                    ad minima. Nemo sint ea inventore iure.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Enim ut mollitia ducimus,
                                    nesciunt sequi nam commodi perferendis unde
                                    deserunt! Unde ipsa voluptatem repudiandae
                                    ad minima. Nemo sint ea inventore iure.
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Non nostrum minima
                                    voluptates accusamus inventore id
                                    necessitatibus blanditiis nesciunt ut earum?
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {/* </BackgroundImage> */}
            {/* </div> */}
        </SvgCompatibleBackgroundImage>
    )
}

export default injectIntl(Hero)
