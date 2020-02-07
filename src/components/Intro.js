import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import {
    changeLocale,
    injectIntl,
    Link,
    FormattedMessage,
} from "gatsby-plugin-intl"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Hidden from "@material-ui/core/Hidden"
import Typography from "@material-ui/core/Typography"

import Lottie from "react-lottie"
import * as animationRu from "../animations/intro/data_ru"
import * as animationEn from "../animations/intro/data_en"

import YellowButton from "./ButtonYellow"

const useStyles = makeStyles(theme => ({
    section: {
        paddingTop: "4rem",
    },
    textbox: {
        paddingBottom: "4rem",
    },
    header: {
        color: "#ffbf55",
        fontWeight: "600",
        marginBottom: "1.7em",
        position: "relative",
        "&::after": {
            content: '""',
            width: "100%",
            height: "2px",
            margin: "0 auto",
            backgroundColor: "#ffbf55",
            display: "block",
            position: "absolute",
            // top: -2px;
            bottom: "-10px",
            // left: -2px;
            // right: -2px;
        },
    },
    text: {
        color: "rgba(255,255,255, 0.7)",
        textIndent: "0.5em",
        "& ul": {
            listStyle: "none",
            padding: "0",
        },
    },
    firstImage: {
        width: "50%",
        position: "absolute",
        border: "5px solid rgba(255,255,255, 0.7)",
        borderBottom: "2.3em solid rgba(255,255,255, 0.7)",
        //   outline: 1px solid grey;
        boxShadow: "5px 5px 11px 0px rgba(0,0,0,0.9)",
        left: "0",
        transform: "translate(1%, 8%)",
        top: "0",
        "&:hover": {
            borderColor: "rgba(255,255,255, 0.8)",
            transitionDuration: "500ms",
            transitionProperty: "all",
            boxShadow: "3px 3px 8px 0px rgba(255,255,255,0.3)",
        },
    },
    secondImage: {
        width: "50%",
        position: "absolute",
        border: "5px solid rgba(255,255,255, 0.7)",
        borderBottom: "2.3em solid rgba(255,255,255, 0.7)",
        //   outline: 1px solid grey;
        boxShadow: "5px 5px 11px 0px rgba(0,0,0,0.9)",
        left: "30%",
        transform: "translate(-1%, -28%)",
        "&:hover": {
            borderColor: "rgba(255,255,255, 0.8)",
            transitionDuration: "500ms",
            transitionProperty: "all",
            boxShadow: "3px 3px 8px 0px rgba(255,255,255,0.3)",
        },
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
    button: {
        marginTop: "4rem",
    },
    paper: {
        // marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: "justify",
        color: "white",
        // color: theme.palette.text.primary,
        boxShadow: "none",
        borderRadius: "0",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.1)",
        backgroundColor: "transparent",
        boxShadow: "1px 0px 20px 5px #fffdfd14",
    },
}))

const Intro = ({ intl }) => {
    const qdata = useStaticQuery(graphql`
        query {
            img1: file(relativePath: { eq: "square1.jpg" }) {
                childImageSharp {
                    fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            img2: file(relativePath: { eq: "square2.jpg" }) {
                childImageSharp {
                    fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            img3: file(relativePath: { eq: "square3.jpg" }) {
                childImageSharp {
                    fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            img4: file(relativePath: { eq: "korjaga.jpg" }) {
                childImageSharp {
                    fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `)

    const classes = useStyles()
    const theme = useTheme()

    function localeToAnimationSource(ruAni, enAni) {
        let source = ""
        switch (intl.locale) {
            case "ru":
                source = ruAni
                break
            case "en":
                source = enAni
                break
        }
        return {
            loop: true,
            autoplay: true,
            animationData: source.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid meet",
            },
        }
    }

    const defaultOptions = localeToAnimationSource(animationRu, animationEn)

    console.log(JSON.stringify(defaultOptions.loop, null, 4))
    console.log(JSON.stringify(intl, null, 4))

    return (
        <Container
            maxWidth={theme.siteContainer.maxWidth}
            component="section"
            className="intro"
            className={classes.section}
        >
            {/* <pre>{JSON.stringify(theme, null, 4)}</pre> */}
            <Grid container spacing={0}>
                <Hidden smDown>
                    <Grid item md={6} lg={5}>
                        <div
                            style={{
                                width: "100%",
                            }}
                        >
                            <Lottie options={defaultOptions} />
                        </div>

                        {/* <Image
                            fluid={qdata.img1.childImageSharp.fluid}
                            fadein="true"
                            durationFadeIn="1000"
                            className={classes.firstImage}
                        />
                        <Image
                            fluid={qdata.img2.childImageSharp.fluid}
                            fadein="true"
                            durationFadeIn="1000"
                            className={classes.secondImage}
                        /> */}
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6} lg={7} className={classes.textbox}>
                    <Typography
                        variant="h4"
                        component="h2"
                        className={classes.header}
                    >
                        {intl.formatMessage({
                            id: "indexSectionIntro.heading",
                        })}
                    </Typography>
                    <div
                        className={classes.text}
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({
                                id: "indexSectionIntro.text",
                            }),
                        }}
                    ></div>
                    <YellowButton
                        className={classes.button}
                        href="https://www.gatsbyjs.org"
                        component="a"
                    >
                        {intl.formatMessage({ id: "indexSectionIntro.button" })}
                    </YellowButton>
                </Grid>
            </Grid>
        </Container>
    )
}

export default injectIntl(Intro)
